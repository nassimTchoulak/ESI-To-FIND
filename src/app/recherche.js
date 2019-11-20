import React from 'react';
import './recherche.css';
import '../my_ui.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Article from './object';

import Axios from 'axios';
import Lower from './phone_button'
import ip from '../store/ip_provider';

//import {Redirect} from "react-router-dom";
//import { BrowserRouter as Router, Route,  NavLink  } from "react-router-dom";
import Instruction from "./instruction";
import {ClipLoader} from "halogenium";




const style = {
    //width: "100%",

     backgroundSize :"cover",
   // backgroundColor : '#261326',
    backgroundColor: '#f9fbfb',
    textAlign: "center",
    position : 'static',
    minHeight:"100%",
    height:"100%",
    zIndex:"0",
    display:"flex"



};

const Article_style ={

    backgroundColor: '#f9fbfb',
    position :"inherits"

};





function add(str){
    return (ip()+str);// api-ip http required
};
const is_mobile = function is_mobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}() ;


class recherche extends React.Component{
    constructor(props){
        super(props);

            // console.log(this.props.location.search);
        const params = new URLSearchParams(this.props.location.search);
        const foo = params.get('type');
        const foo2 = params.get("date");

        let type_init="";
        if(foo!==null){
            type_init = foo;
        }
        let date_init="";
        if(foo2!==null){
            date_init = foo2 ;
        }



            this.toogle_nature =["trouvés","perdus","Tout" ];
            this.state= {nature:"Tout",

                visible_nature:false,

                visible_type:false,
                visible_place:false,
                display_type:[],
                display_place:[],
                type:type_init,
                place:"",
                views :[],
                date:date_init,

                on_update:false

            };



            this.allow_recherche=false;

            this.all_it=[];
            this.all_places=[];
            this.traslator = {};

            this.all_recherche = [] ;



        Axios.get(add('/api/types'), {params: {str:""}}).then((res) => {
            this.all_it=res.data;
            this.all_it.forEach((i)=>{
               this.traslator[i.info]=("glyphicon glyphicon-"+i.icon );
            });


            }
        ).catch((err) => {
            console.log(err)
        });
        Axios.get(add('/api/places'), {params: {str:""}}).then((res) => {
                this.all_places=res.data;
                console.log(this.all_places[0]);

            }
        ).catch((err) => {
            console.log(err)
        });
        this.props.history.push("/app/recherche");

    }



    txt_change_type = event =>{
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


        this.setState({display_type:tmp,visible_type:true,type:event.target.value});
        this.allow_recherche=true;
    };

    txt_change_places = event =>{
        let tmp2 = [];
        let str2 = event.target.value;
        let regt2 = new RegExp("^"+str2,"i");
        this.all_places.forEach((i)=>{
            if((regt2.test(i))&&(tmp2.length<6)){
                tmp2.push(i)
            }
        });

        this.setState({display_place:tmp2,visible_place:true,place:event.target.value});
        this.allow_recherche=true;
    };
    go_to_poster = event =>{
       // document.querySelector("#type_recherche_valeur").focus();
        window.scrollTo(0,0);
        this.props.history.push("/app/poster");
    };
    select_type = event =>{
        let str = event.target.innerHTML;
        str = str.replace(/^ | $/,"");
        str = str.replace(/^ | $/,"");
        this.setState({visible_type:false,type:str});

    };
    select_place = event =>{
        let str = event.target.innerHTML;
        str = str.replace(/^ | $/,"");
        str = str.replace(/^ | $/,"");
        this.setState({visible_place:false,place:str});

    };
    date_change = event =>{

        this.setState({date:event.target.value });
        this.allow_recherche=true;
    };


    reduce_visible = event =>{
       this.setState({visible_type:false,visible_place:false});
    };


    clickhandler_nature = event =>{
        let val = event.target.innerHTML;
        event.stopPropagation();
       // console.log(val);
      this.setState({nature:val,visible_nature:false,visible_place:false,visible_type:false});
        this.allow_recherche=true;

    };
    rechercher = event =>{
     // alert(this.date+" | "+this.state.nature+" | "+this.state.type+" | "+this.state.place);
        let dict ={type:this.state.type,lieu:this.state.place};
                // filter need to be added

            if(this.state.nature==="perdus"){
                dict.nature="perdu";
            }
            else{
                if(this.state.nature==="trouvés"){
                    dict.nature="trouve";
                }
            }


        if(this.state.date===""){

        }
        else{
            dict.date= this.state.date;
        }

        this.setState({on_update:true,views:[]});
        //re init views list




      Axios.get(add('/api/data'),{params:dict}).then(
          (res)=>{

                let views_ls =[];

              console.log(res.data);

              this.all_recherche = res.data ;

              res.data.forEach((i,itr)=>{
                if(itr<18) {
                    views_ls.push(i);
                }
              });

              this.setState({views:views_ls});

              this.setState({on_update:false});



          }
      ).catch( (err)=> {
            console.log(err);
          this.setState({on_update:false});
          }
      );


        this.allow_recherche=false;
    };

    show_nature = event =>{
      this.setState({visible_nature:true});
     // this.allow_recherche=true;
    };


    componentDidMount() {
        this.rechercher();

        document.addEventListener("scroll",this.update_required);
    }

    update_required = event =>{
        this.height1 = ((window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight ) + window.pageYOffset );

        this.height2 = document.documentElement.scrollHeight ; ///height2 is static

        if((this.height2<(this.height1+200))&&(!this.on_update)){


            let yet = [];
            console.log("trigger");
            this.state.views.forEach((i)=>{
               yet.push(i);
            });

            let itr =0;

           this.all_recherche.forEach((t)=>{
               if((this.state.views.indexOf(t)===-1)&&(itr<18)){
                   yet.push(t);
                   itr++ ;
               }
           });

           if(this.state.views.length===this.all_recherche.length){
               // end update
           }

            this.setState({views:yet});



        }
    };

    componentWillUnmount() {
        document.removeEventListener('scroll', this.update_required);
    }




    render(){
        return (
            <div className={" col-xs-12 zero_pad_v2"} >
                <div className={"stick2 col-xs-12"} onClick={this.reduce_visible}>



                    <div className={"col-md-2"} onClick={this.show_nature}>


                          <div className={"col-sm-12 hidden-xs"}> nature des objects  </div>
                           <div className={"my_button_v3 col-xs-12"}>  {this.state.nature} </div>
                           <div id={"holder"} className={"col-xs-12 list"}>

                        {
                            this.state.visible_nature &&( this.toogle_nature.map((i)=>{

                                return (<div onClick={this.clickhandler_nature} className={" list_item col-xs-12 "} key={i.toString()} >
                                    {i}
                                </div>);
                            }) )

                        }

                        </div>
                    </div>

                    <div className={"col-md-3"}>
                        <div className={"col-xs-12"}> types d'objects </div>

                         <input type={"text"} autoComplete={"off"} id={"type_recherche_valeur"} placeholder={"Mon objects"} value={this.state.type} onChange={this.txt_change_type} className={"my_text_box_v2 col-xs-offset-1 col-xs-pull-1 col-xs-9 adapt_type"} />

                        <div className={"col-xs-12 list_hold"}>
                            <div className={"col-xs-10 list"}>
                                {
                                    this.state.visible_type && (this.state.display_type.map((i)=>{
                                        return (<div className={"list_item col-xs-11 col-xs-offset-1"} key={i.info.toString()}>
                                            <div className={"glyphicon glyphicon-"+i.icon+"  span col-xs-1"}> </div>
                                            <div onClick={this.select_type} className={"col-md-5 col-xs-offset-1 inc"} > {i.info.toString()} </div>

                                        </div>);
                                    }))
                                }
                            </div>
                        </div>
                    </div>


                    <div className={"col-md-2 col-md-offset-1"}>
                        <div className={"col-xs-12"}> Date </div>
                        <input type={"date"} onChange={this.date_change} value={this.state.date} autoComplete={"off"} className={"my_text_box_v2 col-xs-offset-1 col-xs-9 col-xs-pull-1 adapt_type"} />
                        <div className={"col-xs-12"}> </div>
                    </div>


                    <div className={"col-md-2 hidden-xs"}>
                        <div className={"col-xs-12"}> Lieu </div>
                        <input type={"text"} placeholder={"place"} value={this.state.place} onChange={this.txt_change_places} autoComplete={"off"}  className={"my_text_box_v2 col-xs-offset-1 col-xs-11 adapt_type"} />
                        <div className={"col-xs-12 list_hold"}>
                            <div className={"col-xs-12 list"}>

                                {
                                    this.state.visible_place && (this.state.display_place.map((i)=>{
                                        return ( <div className={"list_item col-xs-11 col-xs-offset-1"} key={i.toString()}>

                                                <div className={"glyphicon glyphicon-map-marker  span col-xs-1"}> </div>
                                                <div onClick={this.select_place} className={"col-md-5 col-xs-offset-1 inc"} > {i.toString()} </div>

                                            </div>
                                                );

                                    } ))


                                }

                            </div>
                        </div>
                    </div>



                    <div className={"col-md-2 "}>

                        <input type={"button"} onClick={this.rechercher} value={" Recherche"} disabled={!this.allow_recherche} className={" col-xs-offset-1 col-xs-11 adapt_recherche"} />


                    </div>



                </div>



             <div className={"col-xs-12 zero_pad_v2"} style={style}>

            <div className={" recherche testing zero_pad zero_pad_v2"} style={Article_style}>

                {this.state.on_update&&<div className={"col-xs-12"} style={{paddingTop:"100px"}}>
                    <ClipLoader  color={"#ff5774"} size="100px" margin="100px" loading={this.state.on_update} />
                </div>}
                {



                    ( this.state.views.map((i)=>{
                        return(
                            <div className={"col-md-4 zero_pad"} key={i._id}>
                                <Article style={Article_style} {...i}  icon={this.traslator[i.type]} v_mobile={is_mobile} />
                            </div>
                        );
                    }))

                }
                {
                    ((this.state.views.length===0)&&(!this.state.on_update))&&<div className={"col-xs-12 interline"}> <h3>Aucun Résultat ne correspandant à votre recherche</h3></div>
                }



                </div>

                 <div className={"bonus_right"}> <Instruction></Instruction> </div>

             </div>


                <div className={" col-xs-12 "} >
                    <div className={"col-xs-offset-3 col-xs-6 hidden-xs"}> <div onClick={this.go_to_poster} className={"my_button_v2"} > Poster un nouveau Object</div> </div>
                </div>

                <div className={" col-xs-12 end_style "} >
                    ESI TO FIND `@2019
                </div>
                <Lower />


        </div>);
    }


}
export default recherche ;