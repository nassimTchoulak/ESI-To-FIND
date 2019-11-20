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
    constructor(props){
        super(props);
        //let test = stored.get("login");
        let test =null;
        try {


            if (localStorage.getItem("login") !== null) {
                test = localStorage.getItem("login");
            }
        }
        catch(e){
            test=null;

        }

        let log = false;
        let mal ="";
        if(test!==null){
            //console.log(test);
            mal=test;
            log=true;
        }


        this.state ={

            login:log,
            login_err:false,
            login_reset:false,
            signing_err:false,
            password12:false,
            f_mail_login:false,
            f_mail_signing:false,
            email:mal,
            extra:{},
            not_esi:false,
            more_info:false
        };

        this.responseGoogle = this.responseGoogle.bind(this) ;

    }

    signing_control = event =>{
        let str = document.querySelector("#signing_mail").value ;
        let pwd1 = document.querySelector("#signing_pwd1").value;
        let pwd2 = document.querySelector("#signing_pwd2").value;

        this.setState({password12:false,signing_err:false});

        if(!esi.test(str)){
            this.setState({f_mail_signing:true});
        }
        else {
            this.setState({f_mail_signing: false});


            if ((pwd1 === pwd2) && (pwd1.length > 5)) {
                this.setState({password12: false});
            } else {
                this.setState({password12: true});
            }

            if ((pwd1 === pwd2) && (pwd1.length > 4) && (str.length > 4)) {
                Axios.post(add("/api/signing"), querystr.stringify({mail: str, password: pwd1}), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(
                    async (res) => {

                        if (res.data.status) {

                           // this.get_extra_info();
                          //  stored.set("login",JSON.stringify(res.data.data));
                            let miz = res.data.data ;
                            delete miz.password ;
                            delete miz.gmail ;
                            delete miz.token ;
                          await  localStorage.setItem("login",JSON.stringify(miz));
                            this.setState({login: true, email: str});

                        } else {
                            this.setState({signing_err: true});

                        }
                    }
                ).catch((err) => {
                    console.log("error ocuured")
                });

            } else {
                this.setState({password12: true})
            }
        }
    };



    login_control = event =>{
      let str = document.querySelector("#login_mail").value ;
      let pwd = document.querySelector("#login_pwd").value;

        this.setState({login_err:false,login_reset:false,f_mail_login:false});

        if(!esi.test(str)){
            this.setState({f_mail_login:true});
        }
        else {
            this.setState({f_mail_login:false});

            Axios.post(add("/api/login"), querystr.stringify({mail: str, password: pwd}), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(
                async (res) => {

                    console.log(JSON.stringify(res.data));
                    if (res.data.status) {

                        let miz = res.data.data ;
                        delete miz.password ;
                        delete miz.gmail ;
                        delete miz.token ;

                        await localStorage.setItem("login",JSON.stringify(miz));

                            this.setState({login: true, email: str});




                    } else {
                        this.setState({login_err: true});



                    }
                }
            ).catch((err) => {
                console.log(err);
            });

        }
    };

    forgot_pwd = event =>{
        this.setState({login_err:false,login_reset:false,f_mail_login:false});
        //axios re init get
        Axios.get(add('/api/init'),{params:{mail:document.querySelector("#login_mail").value}}).catch((err)=>{
            console.log(err);
        });
        this.setState({login_reset:true});
    };

    responseGoogle= (response)=>{

        try {


            let testing = response.Zi.access_token;

           // console.log(response.profileObj);

            if(!/@esi.dz/.test(response.profileObj.email)){
                this.setState({not_esi:true});
                return 0;
            }

            Axios.post(add("/api/gmail_login"), querystr.stringify({
                name: response.profileObj.name,
                image_path: response.profileObj.imageUrl,
                token: response.Zi.access_token

            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(async (res) => {


                if(res.data.status){
                    await localStorage.setItem("login",JSON.stringify(res.data.data));
                    //this.location.reload();
                    //console.log(this.props);
                    window.location.reload();

                }

            }).catch((err) => {
                console.log(err);
            });

        }
        catch (e) {
            console.log("log in interupted");
        }



    };




    render(){


        if(this.state.login){
            if(this.props.location.search==="?pst"){
                return <Redirect to={"/app/poster?pst"}/>
            }
            else {

                return <Redirect to={"/profile"}/>
            }
        }


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

                  <div className={"col-md-offset-1 col-md-11"}>
                      <div className={"col-sm-6 login_button"}>

                          <button className={"login_google"}
                          onClick={(()=>{
                              document.querySelector("#google_login_unique").click();
                          })}
                          >Se Connecter <img  src={"https://api-esi-to-find.esi.dz/api/get_image_source/google_logo.png"} height={"30px"} width={"auto"} /></button>

                          <div style={{fontFamily:"Exo",fontWeight:"lighter",paddingTop:"20px",cursor:"pointer"}} onClick={()=>{this.setState({more_info:true})}}>
                              <span className={"glyphicon glyphicon-info-sign"}></span> Informations  utilisées
                          </div>
                          {this.state.more_info&&<div style={{fontFamily:"Exo",fontWeight:"lighter",marginTop:"15px"}}>Nous utiliserons  votre nom, votre e-mail et votre photo de profil ,
                              <div> nous sommes authorisés à lire seulement ces informations  </div>

                              <a href={"https://developers.google.com/identity/sign-in/web/people"}>https://developers.google.com/identity </a>

                          </div>}


                          <div style={{display:"none"}}>
                          <GoogleLogin
                              clientId="169435137813-ruftgj46pg62rd4ceistm1u2u0lup7r4.apps.googleusercontent.com"
                              buttonText="   Login    "
                              onSuccess={this.responseGoogle}
                              onFailure={this.responseGoogle}
                              //theme={'dark'}
                             // ux_mode={'redirect'}

                              cookiePolicy={'single_host_origin'}
                          >
                              <h3 id={"google_login_unique"}></h3>
                          </GoogleLogin>
                          </div>





                      </div>
                      <div className={"col-sm-6 login_hints"}>


                          <div className={"col-xs-12 interline"}><span style={{color:"#ff5774"}} className={"glyphicon glyphicon-chevron-right"}></span> Profitez des toutes nos fonctionalités</div>
                             <div className={"col-xs-12 interline"}><span style={{color:"#ff5774"}} className={"glyphicon glyphicon-chevron-right"}></span>  Interagissez avec les publications</div>
                                 <div className={"col-xs-12 interline"}> <span style={{color:"#ff5774"}} className={"glyphicon glyphicon-chevron-right"}></span> Publiez Vos objects Perdus & trouvés </div>



                      </div>

                  </div>
                  </div>

                      {this.state.not_esi&&<div style={{fontSize:"150%", marginTop:"50px"}} className={"col-xs-12 login_error"}>veuillez vous déconnecter de votre compte gmail actuel et se
                          connecter avec votre compte @esi</div>
                      }
                      <div className={"col-xs-12 login_ender login_jumper"} style={{textAlign: "right"}}>Par : TCHOULAK
                      Nassim <div>1CS student</div>
                      </div>
                      <div className={"col-xs-12 login_ender"}>
                          Esi-To-find élimine 99% de vos spammes
                      </div>


            </div>

              </div>
        );
    }


}
export default login;