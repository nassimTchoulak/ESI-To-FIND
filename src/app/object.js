import React from 'react';
import '../my_ui.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './objects.css';
import { withRouter,NavLink } from "react-router-dom";

import img from '../calendar_2.png';
import Axios from "axios";
import querystr from 'querystring';

import ip from '../store/ip_provider';
import {BounceLoader} from "halogenium";

function add(str){
    return (ip()+str);// api-ip http required
};


class object extends React.Component{
    constructor(props){
        super(props);
        this.place = props.lieu; // a list caution
        this.type = props.type;
        this.nature = props.nature;

        this.temps = props.temps; // a list
        this.post_time = props.post_time;
        this.owner = props.owner ;
        this.last_update = props.last_update ;
        this.description = props.description ;
        this._id = props._id;

        this.small_title = !props.v_mobile ;
        if(this.small_title===undefined){
            this.small_title=false ;
        }

        let tmp = new Date(props.date);
        tmp.setHours(tmp.getHours()+10);

        this.date = tmp.toISOString().split("T")[0] ;



        this.image_set = props.image_set;


        /* default is false */
        this._iso = props.isolation ;
        if(this._iso===undefined){
            this._iso =false;
        }

        // default is false
        // says if it's in actuality

        this.indepandante = props.indepandante ;
        if(this.indepandante===undefined){
            this.indepandante = false ;
        }




        this.icon_start ="";
        if(props.nature==="perdu"){
            this.icon_start="glyphicon glyphicon-search";
        }
        else{
            this.icon_start="glyphicon glyphicon-ok";
        }

        let date_old = new Date(this.post_time);

        //date_old.setHours(date_old.getHours() - 1);

        let date_now = new Date();

//        console.log("old",date_old);
  //      console.log("now",date_now);

        this.state = {
            location:0,
            alter_location:false,
            time_diff :Math.abs(date_old.getTime() - date_now.getTime()),
            detail:this.props.show_detail,


            comment_one:"",

            comments:[],

            on_update:false

        };

       this.int_1 = setInterval(this.couter,1000);


        this.int_2 = setInterval(this.get_comments,5000);
        //this.get_comments();

        /*this.props.history.listen((location, action) => {
            // location is an object like window.location
            console.log( location.pathname);

            console.log( action);

        }); */

        document.addEventListener("keydown", this.hide_object, false);

    }

    parser_diff(a){
       if(Math.floor(a/(1000*3600*24*7))!==0){
           return Math.floor(a/(1000*3600*24*7))+" Semaines";
       }
       else{
           if(Math.floor(a/(1000*3600*24))!==0){
               return Math.floor(a/(1000*3600*24))+" Jours";
           }else{
               if(Math.floor(a/(1000*3600))!==0){
                   return Math.floor(a/(1000*3600))+" Heures";
               }
               else{
                   return Math.floor(a/(1000*60))+" minutes";
               }



           }
       }
    }
    parser_diff_comment(str){
        let date0 = new Date();
       // date0.setHours(date0.getHours() - 1);
        let old = new Date(str);
        return this.parser_diff(Math.abs(old.getTime() - date0.getTime())) ;
    }



    parser_date(str){
        let dt = new Date(str);

        let pr =["dimanche","lundi","mardi","mercredi","jeudi","vendredi","Samedi"];

        return (pr[dt.getDay()]+"  "+dt.getDate()+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear()+" ");
    }

     couter = ()=> {
        this.setState({time_diff:this.state.time_diff+1000});

        if(this.state.alter_location){
            this.setState({location:((this.state.location+1)%this.place.length)});
        }
    };
    get_comments_do = () =>{


        let user = "";
        try {
            let data = JSON.parse(localStorage.getItem("login"));
            user = data._id ;
        }
        catch (e) {
            user="";
        }

        if(user!=="") {
            this.setState({on_update:true});
            Axios.get(add("/api/get_comment"), {
                params: {
                    _id: this._id,
                    user: user
                }
            }).then((res) => {
                console.log(res.data);
                this.setState({comments: res.data,on_update:false});

            }).catch((err) => {
                console.log(err);
                this.setState({on_update:false});
            });

        }//user well defined


    };


    get_comments = ()=>{
        if((this.state.detail)){
            this.get_comments_do();
        }

    };

    start_count = event =>{
        this.setState({alter_location:true});
    };
    stop_count = event =>{
      this.setState({alter_location:false});
    };

    location_ajust(){
        if(this.place[this.state.location]===undefined){
            return "Lieu Inconnu";
        }
        else{
            return this.place[this.state.location] ;
        }
    }

    color_location(){
        if(this.state.alter_location){
            return "bluer";
        }
        else{
            return 'blaker';
        }
    }
    show_detail = event =>{
        //console.log(this.date);

        this.get_comments_do();
        if((this._iso)||(this.indepandante)){
            if(this._iso){
                this.props.history.push("/profile/post/" + this._id + "/detail");
            }
            else{
                this.props.history.push("/app/actuality/" + this._id);
            }
        }
        else {
            this.props.history.push("/app/recherche/" + this._id);
        }
        this.setState({detail:true});
    };

    hide_object = event =>{
        if(event.keyCode===27) {
            if (this.state.detail) {
                if((this._iso)||(this.indepandante)){
                    if(this._iso){
                        this.props.history.push("/profile/post/"+this._id);
                    }
                    else{
                        this.props.history.push("/app/actuality");
                    }

                }
                else {
                    this.props.history.push("/app/recherche");
                }
                this.setState({detail: false});
            }
        }
    };

    leave_object = event =>{
        event.preventDefault();

        if(event.target.id==="not_me") {
            if((this._iso)||(this.indepandante)) {
                if(this._iso){
                    this.props.history.push("/profile/post/"+this._id);
                }
                else{
                    this.props.history.push("/app/actuality");
                }

            }
            else {
                this.props.history.push("/app/recherche");
            }
            this.setState({detail: false});
        }
    };


    componentDidUpdate(prevProps) {

        if (this.props.location.pathname !== prevProps.location.pathname) {

            if((this._iso)||(this.indepandante)){

                if(this._iso) {
                    if (this.props.location.pathname !== ("/profile/post/" + this._id + "/detail")) {
                        this.setState({detail: false});
                    }
                }
                else{
                    if (this.props.location.pathname !== ("/app/actuality/" + this._id)) {
                        this.setState({detail: false});
                    }

                }

            }
            else {

                if (this.props.location.pathname !== ("/app/recherche/" + this._id)) {
                    this.setState({detail: false});
                }
            }

        }
    }
    ajuter_nature(str){
        if(str==="trouve"){
            return "Trouvé";
        }
        else{
            return "Perdu";
        }
    }
    comment_change = event =>{
        let test ="";
        try {
            test = JSON.parse(localStorage.getItem("login"))._id;
        }
        catch (e) {
            test="";
        }
      if((event.target.value.toString().length<255)&&(test!=="")){
          this.setState({comment_one:event.target.value})
      }
    };

    submit_comment = event =>{
        let test ="";
        try {
            test = JSON.parse(localStorage.getItem("login"))._id;
        }
        catch (e) {
            test="";
        }

      if((this.state.comment_one.length>1)&&(test!=="")) {

          this.setState({comment_one: ""});
          Axios.post(add("/api/comment"), querystr.stringify({
              _id: this._id,
              poster_id: test,
              str: this.state.comment_one

          }), {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          }).then(async(res) => {
              console.log(res.data);

              try{
                  let dt = JSON.parse(localStorage.getItem("login"));
                  if(dt.interact.indexOf(this._id)===-1) {
                      dt.interact.push(this._id);
                      await localStorage.setItem("login", JSON.stringify(dt));
                  }
              }
              catch (e) {

              }

              this.get_comments_do();

          }).catch((err) => {
              console.log(err)
          });

      }


    };


    render(){


      return(

          <div  className={"col-xs-12 zero_pas "}  >
              <div className={"col-xs-12 box_object zero_pad"} onMouseEnter={this.start_count} onClick={this.show_detail}  onMouseLeave={this.stop_count}>
                  <div className={"col-xs-12 topper_object zero_pad"} >

                        <div className={"col-xs-2 start_icon"}>
                            <span className={this.icon_start}> </span>

                        </div>

                      <div className={" col-xs-8 middle_objects zero_pad_v2"}>
                          <div className={"zero_pad_v2 "} /*style={{position:"absolute",zIndex:"6",backgroundColor:"white"}}*/>
                                  {(()=>{
                               let   str=  this.type[0].toUpperCase()+this.type.slice(1)+" _"+this.ajuter_nature(this.nature) ;
                               if(!this.small_title){
                                   return str;
                               }
                               else{
                                   if(window.screen.width<1300){
                                       return  str.substring(0,19);
                                   }
                                   else{
                                       if(window.screen.width>=1600){
                                           return  str.substring(0,27);
                                       }
                                       else{
                                           return  str.substring(0,21);
                                       }

                                   }
                               }

                              })()}

                          </div>

                      </div>

                      <div className={"col-xs-2 end_icon"} >
                          <span className={"glyphicon glyphicon-"+this.props.icon}>

                          </span></div>

                  </div>

                  <div className={"col-xs-12 core_object zero_pad_v3"}>
                      <div className={"inner_date"}>{" + "+this.parser_diff(this.state.time_diff)+" "}</div>
                      {/*this.indepandante*/true&&<div className={"nb_comments"}>{this.props.nb +" "}<span className={"glyphicon glyphicon-comment comment_time"}></span></div>}

                      {(!this.image_set)&&<span className={this.props.icon}> </span>}

                      {this.image_set&&<img className={"img"}

                       src={add("/api/get_image/"+this._id)}  />}


                  </div>




                  <div className={"col-xs-12 lower_object zero_pad"}>


                      <div className={"col-xs-6 object_low_v1"}>
                            <div className={"col-xs-1"}><img src={img} alt={""} /></div>
                            <div className={"col-xs-9"}>
                                {this.parser_date(this.date).split("  ")[0].toUpperCase()}
                            </div>
                            <div className={"col-xs-12"}>{this.parser_date(this.date).split("  ")[1]}</div>

                      </div>
                      <div className={"col-xs-6 object_low_v1"}>
                          <span className={"glyphicon glyphicon-map-marker "+this.color_location() }>{" "}</span>


                            {" "+this.location_ajust()}


                      </div>

                  </div>


              </div>
              {
                  this.state.detail&&<div className={"col-xs-12 fixed_object zero_pad_v2"} id={"not_me"} onClick={this.leave_object} >
                        <div className={"col-xs-12  col-sm-9 col-sm-offset-2 inner_fixed_object zero_pad_v2"}  >

                        <div className={"col-xs-12"}>
                            <div className={"col-sm-6"}>Posté il y a {this.parser_diff(this.state.time_diff)} </div>
                            <div className={"object_right col-sm-5"}> le {this.parser_date(this.post_time)} </div>

                        </div>

                            <div className={"col-xs-12 col-sm-6"}>

                                 <div className={"col-xs-12 object_title"}>

                                <span className={"col-xs-1 glyphicon glyphicon-"+this.props.icon}></span> <div className={"col-xs-offset-1 col-xs-9"}>{this.type.toUpperCase()}</div>

                                 </div>
                                    <div className={"col-xs-12 object_title"}>
                                    <span className={this.icon_start+" col-xs-1"}></span> <div className={"col-xs-offset-1 col-xs-9"}> {this.ajuter_nature(this.nature)}</div>
                                    </div>


                                <div className={"col-xs-12 liner"}></div>

                                <div className={"col-xs-12 object_left interline_more"}>
                                    When : c'était le <strong>{this.parser_date(this.date)} </strong>
                                </div>

                                <div className={"col-xs-12 object_left object_inline interline_more"}>
                                    Where:<div className={"space_object"}></div> {this.place.map((i)=>{
                                    return <div className={"object_inline"} key={i}><span className={"glyphicon glyphicon-map-marker"}></span> <strong> {""+i+"  "} </strong> <div className={"space_object"}></div></div>
                                    })
                                }
                                </div>
                                <div className={"col-xs-12 object_left object_inline interline_more"}>
                                    temps:<div className={"space_object"}></div>{this.temps.map((i)=>{
                                    return <div key={i} className={"object_inline"}> <div className={"space_object"}></div> <strong>{i}</strong> <div className={"space_object"}></div></div>
                                })}
                                </div>

                                <div className={"col-xs-12 object_left interline_more"} style={{paddingBottom:"30px"}}>
                                    <strong>Description:</strong>
                                    <p>{this.description}</p>
                                </div>
                                <div className={"col-xs-12 "}>
                                    {this.image_set&&<img  src={add("/api/get_image/"+this._id)} width={"100%"}  height={"auto"} alt={""}/>}

                                    {/*!this.image_set&&<div style={{backgroundColor:"#f7b2bb"}} className={"col-xs-12"}> <h4>Image indisponible</h4>
                                    <div className={"col-xs-12 interline liner"}></div></div>*/}

                                    {!this.image_set&&<div className={"col-xs-10 col-xs-offset-1"} style={{color:"white",backgroundColor:"black",fontSize:"500%",minHeight:"150px",lineHeight:"150px",borderRadius:"10px 10px"}}>

                                        <span className={this.props.icon}> </span></div>}

                                </div>
                                <div className={"col-xs-12"}>

                                    <div className={"col-xs-12 object_left interline_more"}>
                                        <strong>Lien de la Publication:</strong>
                                        <NavLink className={"interline col-xs-10"} to={"/profile/post/"+this._id}> {"https://esi-to-find.esi.dz\n/profile/post/"+this._id}</NavLink>
                                    </div>
                                    <div className={"col-xs-12 interline"}></div>

                                </div>

                            </div>

                            <div className={"col-xs-12 col-sm-6"}>
                                <div className={"col-xs-12 interline"}></div>
                                <div className={"object_left col-xs-12"}><h3>Par : </h3> </div>
                                <div className={"col-xs-12 object_title "}>
                                    {//this.owner.mail
                                    (()=>{if(this.owner.mail.length<30){
                                            return this.owner.mail
                                    }
                                    else{
                                        return this.owner.mail.split("@")[0]+"\n@"+this.owner.mail.split("@")[1]
                                    }
                                
                                })()
                                    
                                    } {(this.owner.image!==undefined)&&<img src={this.owner.image} className={"user_image"} alt={"user image"} width={"30px"}/>}
                                </div>


                                <div className={"col-xs-12 interline zero_pad_v2"}></div>

                                <div className={"object_left col-xs-12"}>
                                    <h3 style={{display:"flex"}}>Commentaires & Réponses: {!this.props.visible_comment&&<NavLink href={"#art2"} to={"/aide"}>En Privé </NavLink>}
                                    {((localStorage.getItem("login")!==null)&&(this.props.visible_comment)&&(!this.state.on_update))&&<BounceLoader  color={"#ff5774"} size="25px" style={{marginLeft:"30px"}}  />}

                                    </h3>
                                </div>
                                <div className={"col-xs-12 zero_pad_v2"}>
                                    {
                                        this.state.comments.map((i)=>{
                                            return <div className={"col-xs-12 zero_pad_v2"} key={i.comment_time+i.mail_user +"|" +i.txt_comment}>

                                                    <div className={"col-xs-12 mail_time zero_pad_v2"}>


                                                        <div className={"comment_mail col-xs-8"}><span className={"glyphicon glyphicon-chevron-right zero_pad_v2"}></span><div className={"zero_pad_v2"}>{" "+i.mail_user}</div></div>

                                                    <div className={"comment_time col-sx-4"}>{this.parser_diff_comment(i.comment_time)} ago</div>

                                                    </div>

                                                    <div className={"col-xs-11 col-xs-offset-1 comment_txt"}>{i.txt_comment}</div>
                                            </div>
                                        })
                                    }
                                    {
                                        (this.state.comments.length===0)&&<div className={"col-xs-12"}> aucunne interaction</div> }

                                    {(localStorage.getItem("login")===null)&&<div className={"col-xs-12"}>vous devez étre connecté </div>}

                                </div>
                                <div className={"interline col-xs-12 liner"}></div>
                                <div className={"col-xs-12 small_title object_left"}> Mon commentaire : </div>
                                <div className={"col-xs-12 zero_pad_v2"}>

                                    <div className={"col-xs-8 col-xs-offset-0 col-sm-offset-1"}>
                                        <textarea className={"textarea"} onChange={this.comment_change} value={this.state.comment_one} name="comment" cols="40" rows="1" placeholder={"my commect & interaction"}></textarea>
                                    </div>
                                    <div className={"col-sm-3 col-xs-4 my_button_v4 "} id={"button_comment"} onClick={this.submit_comment}>
                                        <div className={"col-xs-12"}> Submit</div>
                                        <span className={"glyphicon glyphicon-chevron-right"}></span>

                                    </div>

                                </div>
                                <div className={"col-xs-12 interline"}></div>



                            </div>




                        </div>
                  </div>
              }
          </div>




      );
    };


    componentWillUnmount(){
        document.removeEventListener("keydown", this.hide_object, false);
        clearInterval(this.int_1);
        clearInterval(this.int_2);
    };



}
export default withRouter(object);