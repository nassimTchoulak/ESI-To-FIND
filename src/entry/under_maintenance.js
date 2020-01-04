import React from 'react';

import '../my_ui.css';
import './login.css';

import {NavLink, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../logo4.png';
import Axios from 'axios';
import querystr from 'querystring';
import ip from '../store/ip_provider';
import {GoogleLogin} from "react-google-login";

const style = {
    backgroundColor :"white",
    color:"black"
};
const style2 = {
    backgroundColor :"#261326",
    color:"white"
};
//const stored = new Store();

const esi = /^[A-z0-9]+@esi.dz$/ ;


function add(str){
    return (ip()+str);// api-ip http required
};


class login extends React.Component{



    render(){





        return (




            <div className={"zero_pad_v2"} style={style2}>

                <div className={"col-xs-12 login_all"}   >

                    <div className={"col-sm-6 col-md-4 login_top"}>

                        <div className={"col-xs-4"}> <img id={"img_logo"} src={logo} width={"80px"} height={"60px"} /> </div>

                        <NavLink to={"/"} className={"col-xs-3 my_button_v1"}> Accueil</NavLink>
                        <NavLink to={"/aide"} className={"col-xs-4 my_button_v1"}> Aide</NavLink>
                    </div>

                    <div className={"col-sm-6 col-md-8 login_top"} onClick={()=>{
                        document.querySelector("#esi-link").click() ;
                    }}>
                        <NavLink to={"/login"} className={"my_button_v1 col-xs-offset-5 col-xs-7"}  >  Ecole nationale supérieure d'informatique </NavLink>
                        <a href={"http://esi.dz"} id={"esi-link"} style={{display:"none"}}>esi</a>

                    </div>



                    <div className={"col-xs-12 login_core"}>
                        <div className={"login_core_main"}> Connectez-Vous </div>
                        <div className={"login_below"} style={{paddingTop:"20px"}}>Utilisez votre adresse e-mail de l'ESI @esi.dz</div>


                    </div>

                    <div className={"col-xs-12 interline"}></div>

                    <div className={"col-xs-12 "}>

                        <div className={"col-xs-12"}> <h1 className={"extend_on_fhd"}> </h1> </div>





                    <div className={"col-xs-12 login_ender"}>
                        Esi-To-find restera pour vous
                    </div>


                </div>
                </div>
            </div>

        );
    }


}
export default login;