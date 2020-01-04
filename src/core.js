import React , {useState} from 'react';
//import {Route ,Switch} from 'react-router';

import Main from './main';
import Rech from './app/recherche';
import logo from './logo4.png';
import login from './entry/login';
import profil from './entry/profil';
import poster from './entry/poster';
import aide from './entry/aide';
import actual from './app/actuality';

import Under_main from './entry/under_maintenance'
import holder from './app/holder_beta';



//import { NavLink ,Link, BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Route,  NavLink  } from "react-router-dom";
import  'bootstrap/dist/css/bootstrap.min.css';
import './my_ui.css';

//import Background from "./back_img_v1.jpg";

// import { Route, Redirect } from 'react-router'


function Connect_state(){

    //const [count, setCount] = useState(0);

    let test = localStorage.getItem("login");
    let val ;

   // return  <div style={{backgroundColor:"#e0fc5c"}} onClick={()=> setCount(count+1)}> {count} click me </div>



    if(test===null){
        return "Connexion";
    }
    else{
        try{
            val = JSON.parse(test);

            let sending = val.mail.substring(0,19) ;

            if(sending.length!==val.mail.length){
                return sending+"..";
            }
            else{
                return sending;
            }
        }
        catch (e) {
            return "Connexion";
        }
    }
}



function App_head({ routes }) {


    return (
        <div className={"col-xs-12 zero_pad"}>
            <div className={"col-xs-12 stick"} style={style}>

                <NavLink to={"/"}
                         className={"col-md-1  my_button_v3"}> <img src={logo} alt={"logo"} height={"35px"} width={"60px"} /> </NavLink>
                <NavLink to={"/app/actuality"}
                         className={"col-md-1  my_button_v3"}> À LA UNE </NavLink>
                <NavLink to={"/app/recherche"}
                         className={"col-md-1  my_button_v3"}> Recherches </NavLink>

                <div className={"col-md-offset-3 col-md-6 hidden-xs"}>

                    <NavLink to={"/app/poster?pst"} id={"poster_way"} className={"col-md-4 my_button_v3"}> Publier Mon Objet</NavLink>
                    <NavLink to={"/aide"} className={" col-md-offset-1 col-md-2 my_button_v3  "}> Aide</NavLink>
                    <NavLink to={"/login"} className={"col-md-offset-1 col-md-3 my_button_v3"}> {
                       Connect_state()


                    }


                    </NavLink>
                </div>

            </div>

            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </div>
    );
}

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}

            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

/*

const routes = [
    {
        path: "/",//   / means sandwich
        component: Main,
        exact:true
    },
    {
        path:"/login",
        component:login,
        exact:true
    },
    {
        path: "/app",
        component: App_head,
        exact:false,
        routes: [
            {
                path: "/app/poster",
                component:poster ,
                exact:true,
            },
            {
                path: "/app/recherche",
                component:Rech ,
                exact:false,


            }
            ,
            {
                path: "/app/actuality",
                component: actual,
                exact:false,
            }

        ]
    },
    {
        path: "/profile",
        component: App_head,
        exact:false,
        routes:[
            {
                path:"/profile",
                component:profil,
                exact:true
            },{
                path:"/profile/post/:id",
                component:holder,
                exact:false


            }
        ]

    },
    {
        path: "/aide",
        component: App_head,
        exact:false,
        routes:[
            {
                path:"/aide",
                component:aide,
                exact:true
            }
        ]


    }
];

 */

const routes = [
    {
        path: "/",//   / means sandwich
        component: Under_main,
        exact:false
    },
]

const style = {
    width: "100%",
     backgroundSize :"cover",

    backgroundPosition: 'center',

 // minHeight :"100%",




};



class core extends React.Component{


    render(){
        return (
            <Router>
                <div className={"col-xs-12 zero_pad_v2"}>


                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </div>
            </Router>
        );
    }
};

export default core ;
