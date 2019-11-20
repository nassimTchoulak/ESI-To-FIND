import React from 'react';


import '../my_ui.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class instruction extends React.Component{

    constructor(props){
        super(props);
        this.instruction = ["vous devez étre connecté pour interagir avec les publications",
        "la visibilité des commentaires Privée permet de cacher les réponses des intervenants entre eux",
        "Pensez à inclure une question sur l'object trouvé que seul le vrai propriétaire peut connaitre"
        ,"Verifiez toujour si votre object n'a pas été Publié avant de le poster vous mème",
        "Trouvez toutes vos interactions et publications sur l'onglet monMail@esi.dz",
        "Archivez votre object depuis Votre profil pour qu'il ne soit plus visible sur le site"]

        this.state = {
            show_nb:2
        }

    }
    change_nb = event =>{
        if(this.state.show_nb===2){
            this.setState({show_nb:8})
        }
        else{
            this.setState({show_nb:2})
        }
    };
    render(){
        return <div className={"col-xs-12 side_effect_all"}>
            <div className={"col-xs-12"}> Quelques Consignes: </div>

            {this.instruction.map((i,itr)=>{
                if(itr<this.state.show_nb) {
                    return <div key={itr} className={"col-xs-12 side_effect"}>{i} </div>
                }
            })}
            <div className={"col-xs-12"}>
                {(this.state.show_nb===2)&&<span className={"glyphicon glyphicon-chevron-down poster_annuler_location"} onClick={this.change_nb}></span>}


                {(this.state.show_nb===8)&&<span className={"glyphicon glyphicon-chevron-up poster_annuler_location"} onClick={this.change_nb}></span>}
            </div>



            <div className={"col-xs-12"} style={{paddingTop:"50px"}}>
                <div> <span className={"glyphicon glyphicon-search"} style={{color:"#261326"}}></span> : objet perdu</div>


                <div> <span className={"glyphicon glyphicon-ok"} style={{color:"#261326"}}></span> : objet trouvé</div>
            </div>

        </div>
    }


}
export default instruction;