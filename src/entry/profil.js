import React from 'react';



import Axios from 'axios';
import {Redirect , NavLink} from 'react-router-dom';
import '../my_ui.css';
import './profil.css';
import logo from "../logo4.png";
import ip from '../store/ip_provider';


import querystr from 'querystring';

function add(str){
    return (ip()+str);// api-ip http required
};


class profile extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            password_change:false,
            password_not_valid:false,
            old_password_wrong:false,
            password_changed:false,

            info_setted:false,

            tel:"",
            prenom:"",
            year:""



        };
        this.data ={};
        this.first_time=true ;

    }

    deconnect = event =>{
        localStorage.clear();
        this.forceUpdate();
    };
    show_pwd_change = event =>{

        this.setState({password_not_valid:false,
            old_password_wrong:false,password_changed:false,info_setted:false});

      this.setState({password_change:true});

    };
    change_pwd = event =>{
        this.setState({password_not_valid:false,
            old_password_wrong:false,password_changed:false,info_setted:false});

        let pwd1 = document.querySelector("#password1").value;
        let pwd2 = document.querySelector("#password2").value;
        if((pwd1!==undefined)&&(pwd1.length>4)&&(pwd2!==undefined)&&(pwd2.length>4)){

            Axios.post(add("/api/change_password"), querystr.stringify({_id:this.data._id, old_password: pwd1,new_password:pwd2}), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(
                (res)=>{
                    if(res.data.status){
                        this.setState({password_changed:true});
                    }
                    else{
                        this.setState({old_password_wrong:true});
                    }
                }

            ).catch(
                (err)=>{
                    console.log(err);
                }
            );

        }
        else{

            this.setState({password_not_valid:true});

        }

    };
    tel_change = event =>{
        let str = event.target.value ;



        if((!isNaN(str))){
            this.setState({tel:str});
        }

    };
    prenom_change = event =>{
        let str = event.target.value ;
        if((isNaN(str))||(str==="")){
            this.setState({prenom:str});
        }
    };
    update_extra = event =>{

        this.setState({password_not_valid:false,
            old_password_wrong:false,password_changed:false,info_setted:false});

        let clas = document.querySelector("#class").value;

        let test = /cp|cs|enseignant|surveillant|administration /

        if((clas===undefined)||(test.test(clas))){
            Axios.post(add("/api/extra"), querystr.stringify({_id:this.data._id, prenom:this.state.prenom,tel:this.state.tel,year:clas}), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(
                (res)=>{
                    this.setState({info_setted:true});
                }
            ).catch((err)=>{
                console.log(err);
            });
        }



    };

    year_change = event =>{
        this.setState({year:event.target.value});
    };


    componentWillMount(){
        let data_i ="";
        if((this.first_time)&&(localStorage.getItem("login")!==null)){
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






    render(){


        let data_i ="";
        /*console.log(localStorage.getItem("login")); */
        if(localStorage.getItem("login")===null){




            if(this.props.location.search==="?pst"){
                return ( <Redirect to={"/login?pst"}/> );
            }
            else {

                return ( <Redirect to={"/login"}/> );
            }
        }



        return(
            <div className={"col-xs-12 zero_pad_v2 profile_all"}>





                    <h3> Bienvenue Mme/Mr {this.data.mail.split("@")[0]} </h3>


                    <div className={"col-xs-10 col-xs-offset-1 interline"}>
                    <h4> Trouvez ici vos informations personnels que vous souhaitez partager sur notre site ainsi que tous les publications qui vous interressent</h4>

                        <div className={"col-xs-12 liner_profile"}> </div>

                        <div className={"col-xs-12"}> <h1 className={"extend_on_fhd"}> </h1> </div>

                        <div className={"col-sm-4 col-xs-12"}> <label>MES INFORMATIOS </label>

                                <label className={"small_title"}> Email</label>
                            <div className={"col-xs-12"}><label> {this.data.mail}</label></div>


                            <div className={"col-xs-10 col-xs-offset-2"}>
                                <div className={" col-xs-9 "}>
                                    <input type={"button"} className={"my_button_v4  "} onClick={this.deconnect} value={" Déconnexion "}/>
                                </div>
                            </div>

                            <div className={"col-xs-12"}> <h1 className={"extend_on_fhd"}> </h1> </div>

                            <div className={"col-xs-12 interline_profile"}> </div>

                            <label className={"small_title"}>Mes informations supplémentaires  " à fin d'amélioré la communication"</label>

                            <div className={"col-xs-12"}>
                                <div className={"col-sm-offset-1 col-sm-9 interline_profile"}>
                                <input type={"text"} className={"my_text_box_v2 smaller_items"} onChange={this.prenom_change} value={this.state.prenom} placeholder={"prénom"}/>
                                </div>
                                </div>

                            <div className={"col-xs-12"}>
                                <div className={"col-sm-offset-1 col-sm-9 interline_profile"}>
                                    <input type={"text"} className={"my_text_box_v2 smaller_items"} value={this.state.year} onChange={this.year_change} id={"class"} placeholder={" 1cp 2cp 1cs .."}/>
                                </div>
                            </div>

                            <div className={"col-xs-12"}>
                                <div className={"col-sm-offset-1 col-sm-9 interline_profile"}>
                                    <input type={"text"} className={"my_text_box_v2 smaller_items"} onChange={this.tel_change} value={this.state.tel} placeholder={"télephone"}/>
                                </div>
                            </div>

                            {this.state.info_setted&&<div className={"col-xs-12 login_error"}>Informations insérés</div>}
                            <div className={"col-xs-12"}>
                                <div className={" col-sm-9 col-sm-offset-1 interline_profile"}>
                                    <input type={"button"} className={"my_button_v4 smaller_items"} onClick={this.update_extra} value={"      Mettre à jour      "}/>
                                </div>
                            </div>

                            <div className={"col-xs-12"}> <h1 className={"extend_on_fhd"}> </h1> </div>


                            {false&&<div className={"col-xs-12"}>
                                <div className={" col-sm-9 col-xs-pull-2 interline_profile"}>
                                    <input type={"button"} className={"my_button_forgot "} value={" modifier le mot de passe   "} onClick={this.show_pwd_change}/>
                                </div>
                            </div>}
                            <div className={"profile_end col-xs-12"}> </div>
                            {

                            this.state.password_change&&<div className={"col-xs-12 pwd_mod"}>
                                <div className={"col-xs-12"}>
                                    <div className={"col-sm-offset-1 col-sm-9  interline_profile"}>
                                        <input type={"password"} className={"my_text_box_v2 smaller_items"} id={"password1"} placeholder={"password actuel"}/>
                                    </div>
                                </div>

                                <div className={"col-xs-12"}>
                                    <div className={"col-sm-offset-1 col-sm-9 interline_profile"}>
                                        <input type={"password"} className={"my_text_box_v2 smaller_items"} id={"password2"} placeholder={" nouveau password"}/>
                                    </div>
                                </div>
                                {this.state.password_not_valid&&<div className={"col-xs-12 login_error"}> nouveau mot de pass trop petit</div>}
                                {this.state.password_changed&&<div className={"col-xs-12 login_error"}> mot de pass modifié</div>}
                                {this.state.old_password_wrong&&<div className={"col-xs-12 login_error"}> mot de pass incorrect</div>}
                                <div className={"col-xs-12"} id={"interline_login_end"}>
                                    <div className={" col-sm-9 col-sm-offset-1 "}>
                                        <input type={"button"} className={"my_button_v4 smaller_items"} onClick={this.change_pwd} value={"      Modifier      "}/>
                                    </div>
                                </div>



                            </div> }




                        </div>
                        <div className={"col-sm-offset-1 col-xs-offset-0 col-sm-7 col-xs-12"}><label> MES PUBLICATIONS </label>
                            <div className={"col-xs-12 interline_profile"}>


                                <div className={"col-xs-12 mt_button_v1"}>

                                    <NavLink to={"/app/poster"} className={"interline_profile"}   > poster un nouveau Objects
                                    </NavLink>

                                </div>
                                <div className={"interline_profile col-xs-12"}> </div>
                                <label>Mes Objects trouvés & perdus</label>
                                <div className={"col-xs-12 side_profile smaller_items"}>
                                    {
                                        ((this.data.owner_of===undefined)||(this.data.owner_of.length===0))&&(<div className={"smaller_items"}> Aucun poste</div>)

                                    }
                                    {
                                        (this.data.owner_of!==undefined)&&(this.data.owner_of.map((i)=>{
                                            return <NavLink to={"/profile/post/"+i} className={"col-xs-12 smaller_items"} key={i}> {i} </NavLink>
                                        }))
                                    }

                                </div>



                            </div>
                            <div className={"col-xs-12 interline_profile "}><label>Mes Interactions & commentaires</label>

                            <div className={"col-xs-12 side_profile"}>
                                {
                                    ((this.data.interact===undefined)||(this.data.interact.length===0))&&(<div className={"smaller_items"}> Aucunne interaction</div>)

                                }
                                {
                                    (this.data.interact)&&(this.data.interact.map((i)=>{
                                        return <NavLink to={"/profile/post/"+i} className={"col-xs-12 smaller_items"} key={i}>{i} </NavLink>
                                    }))
                                }

                            </div>  </div>




                        </div>


                    </div>
                <div className={"col-xs-12 interline liner"}></div>
                <div className={" col-xs-12 end_style "} >
                    ESI TO FIND `@2019
                </div>





            </div>);
    }



}
export default  profile;