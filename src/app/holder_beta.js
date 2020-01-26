import React from 'react';
import '../my_ui.css';
import Axios from 'axios';
import './holder_beta.css'

import Article from './object';

import ip from '../store/ip_provider';
import querystr from "querystring";

function add(str){
    return (ip()+str);// api-ip http required
};

const Article_style ={

    backgroundColor: '#f9fbfb',

    position :"inherits",


};


class holder extends React.Component{
    constructor(props){
        super(props);

        this._id ="";

        let slash = this.props.location.pathname.split("/");
        if(slash[slash.length-1]==="detail"){
            slash.pop();
        }

        this._id = slash.pop() ;


       // this._id = this.props.location.pathname.split("/").pop() ;
        this.all_it =[];

        this.state = {
            loaded:false,
            view:[],
            owner:false,
            go_archive:false,
            archived:false,
            go_delete:false,
            deleted:false,
        };

        this.mail="";
        try {
            let dict =JSON.parse(localStorage.getItem("login"));
            if(dict.mail!==undefined){
                this.mail = dict.mail ;
            }
        }
        catch (e) {

        }

        this.traslator = {};
        Axios.get(add('/api/types'), {params: {str:""}}).then((res) => {
                this.all_it=res.data;
                this.all_it.forEach((i)=>{
                    this.traslator[i.info]=("glyphicon glyphicon-"+i.icon );
                });
            this.forceUpdate();
            console.log("trans in");

            }
        ).catch((err) => {
            console.log(err)
        });
        Axios.get(add('/api/data_by_id'), {params: {_id:this._id}}).then((res) => {
                this.all_it=res.data;
               if(this.all_it.length>0) {
                   this.setState({views: res.data,loaded:true});
                   //console.log("load in");
                   if(res.data[0].owner.mail===this.mail){
                       this.setState({owner:true});
                   }
                   if(res.data[0].archive){
                       this.setState({archived:true});
                   }

               }

                }).catch((err) => {
            console.log(err)
        });
     //  console.log(this.props.location );
    }
    archive_object = event =>{
        let user ="";
        try {
             user = JSON.parse(localStorage.getItem("login"))._id;
             if(user===undefined){
                 user="";
             }
        }
        catch (e) {
            user="";
        }
        if(user===""){
            return 0 ;
        }

        Axios.post(add("/api/archive"), querystr.stringify({
            user:user,
            _id:this._id

        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            if(res.data.status){
                this.setState({archived:true,go_archive:false});
            }
            else{
                this.setState({archived:false,go_archive:false});
            }
        }).catch(()=>{
            this.setState({archived:false,go_archive:false});
        });
    };

    delete_comments = event =>{
        let user ="";
        try {
            user = JSON.parse(localStorage.getItem("login"))._id;
            if(user===undefined){
                user="";
            }
        }
        catch (e) {
            user="";
        }
        if(user===""){
            return 0 ;
        }

        Axios.post(add("/api/delete_all_comments"), querystr.stringify({
            user:user,
            _id:this._id

        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            if(res.data.status){
                this.setState({deleted:true,go_delete:false});
            }
            else{
                this.setState({deleted:false,go_delete:false});
            }
        }).catch(()=>{
            this.setState({deleted:false,go_delete:false});
        });

    };
    gonna_delete_comments = event =>{
        this.setState({go_delete:true});
    };
    gonna_archive = event =>{
      this.setState({go_archive:true});
    };



    render(){
        return <div className={"col-xs-12 zero_pad_v2 "} style={Article_style} >
            <h3> Trouvez ici un objet qui vous intéresse  </h3>

            <div className={"col-xs-12 interline"}></div>
            {this.state.owner&&<div className={"col-xs-12 interline liner beta_description"}> Vous pouvez controler votre publication en ARCHIVANT votre object ou en supprimant les commentaire</div>}

            {!this.state.owner&&<div className={"col-xs-12 interline liner beta_description"}> Cette page est accessible dans notre site via votre profil  </div>}
            {this.state.loaded&&<div className={"col-xs-12 col-sm-offset-2 col-sm-6"}> {
                this.state.views.map((i)=>{

                   return  <div className={"col-sm-8 zero_pad"} key={i._id} style={{paddingBottom:"100px"}}>
                        <Article style={Article_style} {...i} show_detail={(this.mail!==i.owner.mail)} isolation={true} icon={this.traslator[i.type]} />
                    </div>


                }) }</div>}

            <div className={"col-xs-12 col-sm-4 beta_description "}>

                {this.state.owner&&<div className={"col-xs-12"}>


                <div className={"col-xs-12"}>
                <div className={"col-xs-8 interline"}>
                    <input type={"button"} className={"my_button_v4"} onClick={this.gonna_archive} value={" ARCHIVER L'OBJECT "}/>
                </div>
                    <div className={"col-xs-12 interline"}>  Retirez votre Object et Poste du site et ne plus l'afficher sur recherche</div>
                    {this.state.go_archive&&<div className={"col-xs-12 interline my_error_msg"}><div>êtes-vous sûr de vouloir archiver l'object</div>
                        <div className={"col-xs-5 col-xs-offset-4 my_button_v4"} onClick={this.archive_object}>Confirmer</div>


                    </div>}
                    {
                        this.state.archived&&<div className={"col-xs-12 my_error_msg"}>object archivé</div>
                    }
            </div>


                <div className={"col-xs-12"}>
                    <div className={"col-xs-8 interline"}>
                        <input type={"button"} onClick={this.gonna_delete_comments} className={"my_button_v4"} value={" Supprimer les commentaires "}/>
                    </div>
                    <div  className={"col-xs-12 interline"}> Remise à 0 des commentaires de la publication</div>
                    {this.state.go_delete&&<div className={"col-xs-12 interline my_error_msg"}>
                        <div>êtes-vous sûr de vouloir supprimer les commentaires</div>
                        <div className={"col-xs-5 col-xs-offset-4 my_button_v4"} onClick={this.delete_comments}>Confirmer</div>


                    </div>}

                    {
                        this.state.deleted&&<div className={"col-xs-12 my_error_msg"}>les commentaires ont été remis à zero</div>
                    }
                </div>

            </div> }

                <div className={"col-xs-12 interline "}>interagir avec cette publication notifiera le propriétaire par mail
                </div>


                </div>




            <div className={"col-xs-12 end_style hidden-lg hidden-md hidden-sm  "} >
                ESI TO FIND `@2020
            </div>



        </div>
    }


}
export default holder;