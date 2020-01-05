import React from 'react';
import {Redirect} from "react-router-dom";
import '../my_ui.css';
import Axios from 'axios';
import './poster.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import querystr from 'querystring';
import ip from '../store/ip_provider';
import {getType, getPlace} from "../redux/actions";
import {connect} from "react-redux";






const end_style={
    minHeight: "60px",
backgroundColor: "#2e3131",
color: "white",
padding: "20px",
textAlign: "center"
};




function add(str){
    return (ip()+str);// api-ip http required
};
class poster extends React.Component{
    constructor(props){
        super(props);
        this.state = {



            visible_type:false,
            visible_place:false,
            display_type:[],
            display_place:[],

            places:[],
            place:"",
            type:"",

            type_error:false,
            date_error:false,
            time_error:false,

            on_upload:false,
            file:null,
            upload_rate:0,


            visible_help:false,
            ask_question:false,


            tel:"",
            prenom:"",
            year:""
        };
        this.data ={};// profile
        this.first_time=true ;



        this.all_it=[];
        this.all_places=[];
        this.traslator = {};

        document.addEventListener("click", this.hide_object_all, false);


        // binding upload end
        this.end_update = this.end_update.bind(this);

        //window.resizeTo(1360,700);
        this.set_send_rate = this.set_send_rate.bind(this);

    }

    type_focus = event =>{
        document.querySelector("#type").focus();
    };

    /*componentDidMount() {
        //document.querySelector("#type").focus();
       // window.scrollTo(0, 0);

    } */


    type_event = event =>{
        event.preventDefault();
        let tmp = [];
        let str = event.target.value;
        if(/[!$%^&*()+|~=`{}\[\]:\/;<>?,.@#]/.test(str)){
            return 0;
        };
        let regt = new RegExp("^"+str,"i");
        this.all_it.forEach((i)=>{
            if((regt.test(i.info))&&(tmp.length<6)){
                tmp.push(i);
            }
        });

        this.setState({type:event.target.value,visible_type:true,display_type:tmp,type_error:false});

    };
    select_type = event =>{
        let str = event.target.innerHTML;
        str = str.replace(/^ | $/,"");
        str = str.replace(/^ | $/,"");
        this.setState({visible_type:false,type:str});
    };

    unchange = event =>{
        event.stopPropagation();
        event.preventDefault();

    };

    visible_help = event =>{
        this.setState({visible_help:true});
    }

    poster_object =event =>{
      let trouve = document.querySelector("#rd1").checked ;

      let matin = document.querySelector("#matin").checked;
      let midi =document.querySelector("#midi").checked;
      let soir =document.querySelector("#soir").checked;

      let date = document.querySelector("#date").value;

        let val1 = document.querySelector("#rd2_com").checked; /// visiblilité privé
        let visible_comment_insert = "";

        if(val1){
            visible_comment_insert="0";
        }
        else{
            visible_comment_insert="1";
        }


        if((date!==undefined)&&(this.state.type!=="")&&(this.state.type.length<26)&&(this.state.type!==undefined)&&(date!=="")){
        let time ="";
        if(matin){
            time="matin";
        };
        if(midi){
            time+="|midi";
        }
        if(soir){
            time+="|soir";
        }
        if(time===""){
            this.setState({time_error:true});
            document.querySelector("#matin").focus();
            return 0;
        }
        let lieu1 = "";
        this.state.places.forEach((i,itr)=>{
            if(itr===0){
                lieu1=i;
            }
            else{
                lieu1+=("|"+i);
            }
        });


        let description ="";
        if(document.querySelector("#description").value!==undefined){
            description=document.querySelector("#description").value;
        }
        let owner_o = (JSON.parse(localStorage.getItem("login"))) ;



        let nature ="";
        if(trouve){
            nature = "trouve";

        }
        else{
            nature="perdu";
        };

          this.setState({on_upload:true});

        Axios.post(add("/api/post"), querystr.stringify({
            type:this.state.type,
            lieu:lieu1,
            temps:time,
            nature:nature,
            poster:owner_o.mail,
            date:date,
            description:description,
            owner:owner_o._id,
            visible_comment:visible_comment_insert

        }), {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          }).then(
               (res) => {

                  console.log(JSON.stringify(res.data));
                  let tmp = JSON.parse(localStorage.getItem("login"));

                  tmp.owner_of.push(res.data._id);

                   localStorage.setItem("login", JSON.stringify(tmp));

                  function timeout(ms) {
                      return new Promise(resolve => setTimeout(resolve, ms));
                  }

                  if(this.state.file!==null) {
                     this.send_file(res.data._id);

                  }
                  else {

                      //  if (res.data.status) {

                       timeout(1500).then(()=>{
                           this.props.history.push("/profile/post/" + res.data._id);

                       });


                  }


              }).catch((err) => {
              console.log(err);
              setTimeout(()=>{
                  this.poster_object() ;
              },500);
          });






      }
      else{
          if((this.state.type==="")||(this.state.type===undefined)||(this.state.type.length>25)){
                this.setState({type_error:true});
              document.querySelector("#type").focus();
          }
          else{
                this.setState({date_error:true});
                document.querySelector("#date").focus();
          }



      }


    };

    place_change = event =>{

        let tmp2 = [];
        let str2 = event.target.value;
        let regt2 = new RegExp(""+str2,"i");
        this.all_places.forEach((i)=>{
            if((regt2.test(i))&&(tmp2.length<6)){
                tmp2.push(i)
            }
        });

        this.setState({display_place:tmp2,visible_place:true,place:event.target.value});

    };
    click_add_lieu = event =>{
        let str = event.target.innerHTML;
        str = str.replace(/^ | $/,"");
        str = str.replace(/^ | $/,"");
        //console.log(this.state.places);

        if(this.state.places.indexOf(str)===-1) {

            this.setState({visible_place: false, place:"",places: [...this.state.places,str]});
        }
        else{
            this.setState({visible_place: false, place:""});
        }
    };
    add_lieu = event =>{
        if((this.state.places.indexOf(this.state.place)===-1)&&(this.state.place!=="")){
            this.setState({visible_places:false,place:"",places: [...this.state.places,this.state.place]})
        }
        else{
            this.setState({visible_places:false,place:""});
        }
    };
    delete_places = event =>{
      this.setState({places:[],place:"",visible_place:false});
    };

    delete_date = event =>{
      this.setState({date_error:false});
    };
    delete_time = event =>{
        this.setState({time_error:false});
    };

    file_change = event =>{

        this.setState({file:event.target.files[0]});

        let reader  = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.addEventListener("load", function () {
            // preview.src = reader.result;
            document.querySelector("#image_preview").src = reader.result;
        });

    };
    cancel_file = event =>{
      this.setState({file:null});
        document.querySelector("#image_preview").src = "";

    };

    set_send_rate(str){
        this.setState({upload_rate:str})
    }


    send_file(str){


        this.setState({on_upload:true});


        let reader  = new FileReader();

        reader.readAsDataURL(this.state.file);

        let func = this.end_update ;
        let env = this ;

        let send_info = this.set_send_rate ;

        reader.addEventListener("load", function () {
           // preview.src = reader.result;
            let tempImg = new Image();
            tempImg.src = reader.result;
            tempImg.onload = function() {
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 600;
                let canvas = document.createElement('canvas');
                let ctx ;
                let old_width = tempImg.naturalWidth;
                let old_height = tempImg.naturalHeight;
                console.log(old_width);
                console.log(old_height);
                let new_width = 0;
                let new_height =0;
                if (old_width > old_height) {
                    new_height = ((old_height*MAX_WIDTH)/old_width);
                    new_width = MAX_WIDTH ;
                    canvas.width= new_width ;
                    canvas.height = new_height ;
                    ctx = canvas.getContext("2d");
                    ctx.drawImage(this,0,0,new_width,new_height);
                } else {
                    new_height =MAX_HEIGHT ;
                    new_width = MAX_HEIGHT ;
                    canvas.height = MAX_HEIGHT ;
                    canvas.width = MAX_WIDTH ;
                    ctx = canvas.getContext("2d");
                    ctx.drawImage(this,0,(old_width-old_height)/2,old_width,old_width   , (MAX_WIDTH-MAX_HEIGHT )/2,0,MAX_HEIGHT,MAX_WIDTH);
                }

                //console.log(canvas.toDataURL("image/jpeg"));
                Axios.post(add("/api/post_image/"+str), querystr.stringify({
                    image:canvas.toDataURL("image/jpeg"),


                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    onUploadProgress: function( progressEvent ) { // upload_rate
                        //console.log( parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) ) ) ;
                        send_info(parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) )) ;

                    }.bind(this)



                }).then((res)=>{

                    func(str);

                }).catch((err)=>{
                    console.log(err);
                   // func("some_where_far");
                    setTimeout(()=>{
                        //call send file again with same params
                        env.send_file(str);
                    },500);
                });
            };

        }, false);


    }
    end_update(object_id){

        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        timeout(1500).then(()=>{
           // this.setState({on_upload:false});
            this.props.history.push("/profile/post/" + object_id.toString());

        });



    }

    detect_aleignement = event =>{
      let val1 = document.querySelector("#rd2_com").checked ;
      let val2 = document.querySelector("#rd1").checked ;

      if(val1&&val2){
          this.setState({ask_question:true});
      }
      else{
          this.setState({ask_question:false});
      }

    };

    hide_object_all = event =>{
        this.setState({visible_place:false,visible_type:false})
    };

    componentWillUnmount(){
        document.removeEventListener("click", this.hide_object_all, false);

    };




    render(){

        let data_i ="";
        /*console.log(localStorage.getItem("login")); */
        if(localStorage.getItem("login")===null){

            if(this.props.location.search==="?pst"){
                return (<Redirect to={"/login?pst"}/>);
            }
            else {

                return (<Redirect to={"/login"}/>);
            }
        }
        else{

            if(this.first_time){
                this.first_time =false;
                data_i = localStorage.getItem("login");
                try {
                    this.data = JSON.parse(data_i);
                    if(this.data.prenom===undefined){
                        this.data.prenom ="";
                    }
                    if(this.data.tel===undefined){
                        this.data.tel ="";
                    }
                    if(this.data.year===undefined){
                        this.data.year ="";
                    }

                    this.setState({prenom:this.data.prenom,tel:this.data.tel,year:this.data.year});
                } catch (e) {
                    localStorage.clear();
                }
            }
        }


        return <div id={"poster_div"} className={"col-xs-12 poster_all zero_pad_v2"}>

            <div className={"col-xs-12 poster_inner"}>

            <h3> Postez ICI vos objects perdus et trouvés pour étre visible sur notre site</h3>
            <div className={"interline"}></div>
            <h4> les gens peuvent interagir & commenter avec votre publication à fin de vous aider à trouver le propriètaire d'un object trouvé ou votre object perdu</h4>

            <div className={"col-xs-11 col-xs-offset-1 liner"}></div>
            <div className={"col-xs-10 col-xs-offset-1 interline poster_start "}>
                Par :<span>&nbsp;&nbsp;</span> <div className={"poster_big"}>{" "+this.data.mail}</div>
            </div>
            </div>

            <div className={"col-xs-12 interline"}>
            <div className={"col-sm-offset-1 col-sm-5"}>
                <div className={"col-xs-12 small_title "}>type:</div>

                    <input type={"text"} id={"type"} autoComplete={"off"} onClick={this.type_focus} key={"editor1"} className={"my_text_box_v2"} value={this.state.type} onChange={this.type_event} placeholder={"Mon object"}/>
                {this.state.type_error&&<div className={"col-xs-12 my_error_msg"}> le type ne doit pas étre vide ou plus de 25 caractères</div>}
                  <div className={"col-xs-12 list_hold_poster"}>
                      <div className={"col-xs-10 list"}>
                          {
                              this.state.visible_type && (this.state.display_type.map((i)=>{
                                  return (<div className={"list_item col-xs-11 col-xs-offset-1"} key={i.info.toString()}>
                                      <div className={"glyphicon glyphicon-"+i.icon+"   col-xs-1"}> </div>
                                      <div onClick={this.select_type} className={"col-md-5 col-xs-offset-1 "} > {i.info.toString()} </div>

                                  </div>);
                              }))
                          }
                      </div>



                 </div>

            </div>
            <div className={"col-sm-offset-1 col-sm-5  post_description interline hidden-xs"} onClick={this.type_focus}> entrez ici le type de votre object</div>
            </div>



            <div className={"col-xs-12 interline"}>
            <div className={"col-sm-offset-1 col-sm-5"}>
                    <div className={"col-xs-12 small_title "}>nature :</div>
                <div className={"col-xs-6 small_title"}>
                    <input type={"radio"} defaultChecked={true} name={"rd"} onChange={this.detect_aleignement} id={"rd1"}/><label  className={"label label_v1 "} htmlFor={"rd1"}>trouvé</label>
                </div>
                 <div className={"col-xs-6 small_title"}>
                    <input type={"radio"} name={"rd"} onChange={this.detect_aleignement} id={"rd2"}/><label  className={"label label_v1"} htmlFor={"rd2"}>perdu</label>
                </div>
            </div>
                <div className={"col-sm-offset-1 col-sm-5 post_description interline hidden-xs"}> indiquez la nature de votre object </div>
            </div>


            <div className={"col-xs-12 interline"}>
                <div className={"col-sm-offset-1 col-sm-5"}>
                    <div className={"col-xs-12 interline"}></div>
                    <div className={"col-xs-12 small_title "}>Visibilité des interactions :</div>
                    <div className={"col-xs-6 small_title"}>
                        <input type={"radio"} defaultChecked={true} name={"rd_com"} onChange={this.detect_aleignement} id={"rd1_com"}/><label  className={"label label_v1 "} htmlFor={"rd1"}>Public</label>
                    </div>
                    <div className={"col-xs-6 small_title"}>
                        <input type={"radio"} name={"rd_com"} onChange={this.detect_aleignement} id={"rd2_com"}/><label  className={"label label_v1"} htmlFor={"rd2_com"}>Privé</label>
                    </div>
                    <div className={"col-xs-12 my_button_forgot interline"} onClick={this.visible_help}> <span className={"glyphicon glyphicon-info-sign"}></span> Plus de detail</div>
                    {this.state.visible_help&&<div className={"col-xs-12 smaller_items"}>la visibilité des commentaires Privée permet de cacher
                        les réponses des intervenants entre eux , vous seul auriez l'access à toutes les réponses
                        <div className={"col-xs-12"}>Pensez à utiliser le mode<strong> Privé</strong> pour <strong> les objects trouvés </strong> tout en <strong> ajoutant un question </strong> dans le champ description</div></div>
                    }
                    </div>
                <div className={"col-sm-offset-1 col-sm-5 post_description interline hidden-xs"}> visibilité privé empéche les differents utilisateurs de percevoir les interactions des
                    autres, seul le propriètaire de la publication peut visualiser l'ensemble </div>
            </div>


            <div className={"col-xs-12 interline"}>
                <div className={"col-sm-offset-1 col-sm-5"}>
                    <div className={"col-xs-12 small_title "}>Date :</div>
                    <input type={"date"} onChange={this.delete_date} id={"date"}/>
                    {this.state.date_error&&<div className={"col-xs-12 my_error_msg"}> la date ne doit pas étre vide</div>}
                </div>

                <div className={"col-sm-offset-1 col-sm-5 post_description interline hidden-xs "}>indiquer la date de la perte de votre object ou la date de trouvaille </div>
            </div>


            <div className={"col-xs-12 interline "} onClick={this.delete_time}>
                <div className={"col-sm-offset-1 col-sm-5 "}>

                    <div className={"col-xs-12 small_title "}>Temps :</div>

                    <div className={"col-xs-4 small_title"}>
                    <input type={"checkbox"}  defaultChecked={true} id={'matin'} /><label className={"label label_v2"}>matin</label>
                    </div>
                    <div className={"col-xs-4 small_title"}>
                        <input type={"checkbox"}  defaultChecked={true} id={"midi"}/><label className={"label label_v2"}>midi</label>
                    </div>
                    <div className={"col-xs-4 small_title"}>
                        <input type={"checkbox"}  defaultChecked={true} id={"soir"} /><label className={"label label_v2"}>Soir</label>
                    </div>
                    {this.state.time_error&&<div className={"col-xs-12 my_error_msg"}>vous devez indiquez les temps suspectible</div>}





                </div>
                <div className={"col-sm-offset-1 col-sm-5 post_description interline hidden-xs"}>
                    indiquer quand l'object à été perdu ou trouvé

                </div>

            </div>


            <div className={"col-xs-12 interline"}>

            <div className={"col-sm-offset-1 col-sm-10"}>
                <div className={"col-xs-12 small_title"}>description </div>
            <textarea className={" interline textarea"} id={"description"} cols="40" rows="5" placeholder={(()=>{
                if(this.state.ask_question){
                    return " description et une question à propos de cet object"
                }
                else{
                    return " description brève de l'object"
                }
            })()} />
            </div>

            </div>


            <div className={"col-xs-12 interline"}>
                <div className={"col-sm-offset-1 col-sm-5 zer_pad_v2"}>
                    <div className={"col-xs-12 small_title "}>Lieux :</div>
                    <div className={"col-xs-7 zero_pad_v2"}><input type={"text"} value={this.state.place} onChange={this.place_change} className={"my_text_box_v2"}/>

                        <div className={"col-xs-12 list_hold_poster"}>
                            <div className={"col-xs-12 list"}>

                                {
                                    this.state.visible_place && (this.state.display_place.map((i)=>{
                                        return ( <div className={"list_item col-xs-11 col-xs-offset-1"} key={i.toString()}>

                                                <div className={"glyphicon glyphicon-map-marker  span col-xs-1"}> </div>
                                                <div onClick={this.click_add_lieu} className={"col-md-5 col-xs-offset-1 inc"} > {i.toString()} </div>

                                            </div>
                                        );

                                    } ))


                                }

                            </div>



                        </div>
                    </div>
                    <div className={"col-xs-5"}><input type={"button"} value={" Ajouter lieu "} onClick={this.add_lieu} className={"my_button_v4"}/></div>

                    {(this.state.places.length>0)&& <div className={"col-xs-12"}>
                    <div className={"col-xs-12 zero_pad_v2 small_title"}>Lieux selectionnés:</div>

                    <label className={"col-xs-12 location_poster"}>
                        {
                            (   this.state.places.map((i)=>{
                                return  <div key={i.toString()} className={""}> <span className={"glyphicon glyphicon-map-marker"}></span> {i} <span>&nbsp;&nbsp;</span></div>
                            }) )

                        }
                        <div><span onClick={this.delete_places} className={"glyphicon glyphicon-remove poster_annuler_location"}></span></div>
                    </label>
                    </div> }

                </div>

                <div className={"col-sm-offset-1 col-sm-5 hidden-xs"}>
                    <div className={"col-xs-12 interline"}> </div>Indiquer les lieux potentiels de pertes
                    où vous étiez présent ou le lieu de trouvaille </div>
            </div>

            <div className={"col-xs-12 interline"}></div>
            <div className={"col-xs-12 interline"} id={"file_hold"}>
                <div className={"col-sm-offset-1 col-sm-5"}>
                    <div className={"col-xs-12 small_title "}>Ajouter une Photo  paysage [ <span className={"glyphicon glyphicon-picture"}></span> ]:</div>
                    <input id={"my_file_input"} type={"file"}  onChange={this.file_change}/>


                    <div className={"col-xs-12 interline"}> </div>
                    <div className={"col-xs-10 col-xs-offset-1 my_button_v4"}
                        onClick={(()=>{
                          document.querySelector("#my_file_input").click();
                               })} >
                        selectionner photo <span className={"glyphicon glyphicon-download-alt"}></span>
                    </div>

                    <span>&nbsp;&nbsp;</span>


                    {(this.state.file!==null)&&<div className={"col-xs-12 my_button_forgot interline"}>
                        <img src="" id={"image_preview"} alt="Aucunne image" width={"200px"} height={"150px"}/>

                        <span onClick={this.cancel_file}
                              className={"glyphicon glyphicon-remove poster_annuler_location"}></span></div>
                    }
                    {
                        (this.state.file===null)&&<div className={"col-xs-12"}> ( optionnel ) </div>
                    }
                </div>

                <div className={"col-sm-offset-1 col-sm-5 hidden-xs"}>donner un image PAYSAGE clair de l'object trouvé ou perdu si possible" en oriantant votre téléphone en Paysage "</div>
            </div>



            {this.state.on_upload&&<div className={"col-xs-12"}>
                <div className={"col-xs-12 interline liner"}></div>
                <h3> Veuillez patienter pandant le telechargement de la publication ... {(()=>{

                    if((this.state.file!=="")||(this.state.file!==null)){
                        return this.state.upload_rate +" % ";
                    }


                })()}</h3>
                <h3>{/*this.state.upload_rate*/}</h3>

                <div className={"col-xs-12 interline liner"}></div>


            </div>}


            <div className={"col-xs-12 interline liner"}></div>

            <div className={"col-xs-12"}><input type={"button"} disabled={this.state.on_upload} onClick={this.poster_object} id={"post_btn"} className={"my_button_v2 "} value={" Publier Votre Object "}/></div>


            <div className={"col-xs-12 interline liner"}></div>


            <div className={" col-xs-12"}  style={end_style}>
                ESI TO FIND `@2019
            </div>






        </div>;
    }

    componentDidMount() {

        if(this.props.type.loaded){
            this.all_it=this.props.type.types ;

            this.all_it.forEach((i)=>{
                this.traslator[i.info]=("glyphicon glyphicon-"+i.icon );
            });
        }

        if(this.props.place.loaded){
            this.all_places = this.props.place.places ;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((this.props.type.loaded)&&(!prevProps.type.loaded)){
            this.all_it=this.props.type.types ;

            this.all_it.forEach((i)=>{
                this.traslator[i.info]=("glyphicon glyphicon-"+i.icon );
            });
        }

        if((this.props.place.loaded)&&(!prevProps.place.loaded)){
            this.all_places = this.props.place.places ;
        }

    }


}
const mapStateToProps = (state)=>{


    return {
        place : {
            loaded: state.place.loaded,
            places : state.place.places
        },
        type : {
            loaded: state.type.loaded,
            types: state.type.types
        }
    }
}

const mapDispatchToProps = {

    getType , getPlace

}

export default connect(mapStateToProps,mapDispatchToProps)(poster);