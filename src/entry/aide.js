import React from 'react' ;

import './aide.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../my_ui.css';
import Instruction from "../app/instruction";


const Aide = () => {



    return <div className={"col-xs-12 aide_all_upper"}>
       <div className={"side_aide"}>

           <div className={"col-xs-12 interline "} style={{fontSize:"200%",color:"#ff5774"}}><span className={"glyphicon glyphicon-search"}></span> Guide</div>


           <div className={"col-xs-12 interline"}></div>
           <a href={"#art0"} className={"col-xs-12 my_button_v3"}>Présentation de Esi-To-Find</a>
           <div className={"col-xs-12 interline"}></div>
           <a href={"#art1"}  className={"col-xs-12 my_button_v3"}>Pourquoi utiliser Esi-To-Find</a>
           <div className={"col-xs-12 interline"}></div>
           <a href={"#art2"}  className={"col-xs-12 my_button_v3"}>Comment Utiliser Esi-To-Find</a>
           <div className={"col-xs-12 interline"}></div>
           <a href={"#art3"}  className={"col-xs-12 my_button_v3"}>Fondateur de Esi-to-Find</a>
       </div>

        <div className={" zero_pad aide_main"}>

            <div className={"col-xs-12 interline"}><h3>Cette page est dédié à vous  aider à : </h3>

                <h3 style={{textAlign:"left"}}><span style={{color:"#ff5774"}} className={"glyphicon glyphicon-chevron-right"}></span> comprendre notre concept </h3>
                <h3 style={{textAlign:"left"}}> <span style={{color:"#ff5774"}} className={"glyphicon glyphicon-chevron-right"}></span> tirer la maximum de nos fonctionalités</h3> </div>

            <div className={"col-xs-12 zero_pad"} id={"art0"}>

                <div className={"col-xs-12 aide_head"} >
                    Presentation
                </div>
                <div className={"col-xs-12 aide_info"}>
                    <p> <span>&nbsp;&nbsp;</span>Esi-To-Find est une plateforme dédiée à la gestion des objets perdus & trouvés présenté par l'école nationale supérieure d'informatique d'Alger.</p>
                    <p>  <span>&nbsp;&nbsp;</span>   Cette plateforme intégre chaque étudiant , enseignant et employé à l'ESI , en utilisant l'identifiant unique de " ESI - Google " cela va permettre de se connecter exclusivement en utilisant vos compte @esi.dz . </p>
                    <p><span>&nbsp;&nbsp;</span>Nous avons fait en sort de grantir une plateforme facilement accessible à tous.</p>
                    <p><span>&nbsp;&nbsp;</span>tout devient facile à trouver  </p>

                </div>
            </div>


            <div className={"col-xs-12 zero_pad"} id={"art1"}>

                <div className={"col-xs-12 aide_head"} >
                    Pourquoi utiliser Esi-To-Find
                </div>
                <div className={"col-xs-12 aide_info"}>
                   <p><span>&nbsp;&nbsp;</span> <span style={{color:"#ff5774"}} className={"glyphicon glyphicon-chevron-right"}></span>
                       <strong style={{color:"#ff5774",fontWeight:"bolder"}}>Ne pas déranger tout le monde :</strong> une autre façon de publier son Object perdu est de publier ce dernier dans le mail de l'école !
                       mais néanmoins cela provoque le désagrément de notre communauté qui malgré cela très reste compréhensive !</p>

                    <p><span>&nbsp;&nbsp;</span> <span style={{color:"#ff5774"}} className={"glyphicon glyphicon-chevron-right"}></span>
                        <strong style={{color:"#ff5774",fontWeight:"bolder"}}>La persistance :</strong> votre mail d’Object perdu/trouvé sera très vite oublié et pas mis en valeur avec le nombre de mails reçus chaque jour contrairement
                        à Esi-To-Find , ou vous avez aussi la possibilité d'archiver votre publication au moment voulu.
                    </p>
                    <p><span>&nbsp;&nbsp;</span><span style={{color:"#ff5774"}} className={"glyphicon glyphicon-chevron-right"}></span>
                        <strong style={{color:"#ff5774",fontWeight:"bolder"}}>La Simplicité :</strong> tout au cours du développement de cette plateforme nous avons insisté sur la simplicité de l'UX l'expérience utilisateur qui
                        peut s'améliorer avec le temps pour mieux gérer vos besoins </p>

                    <p><span>&nbsp;&nbsp;</span><span style={{color:"#ff5774"}} className={"glyphicon glyphicon-chevron-right"}></span>
                        <strong style={{color:"#ff5774",fontWeight:"bolder"}}>les interactions et leurs visibilité : </strong>
                        nous disposons d'un ensemble de mécanisme pour mieux gérer vos besoins comme la mise à disposition des
                        commentaires pour chaque publication , cet outil vous permet de contrôler la visibilité de interactions entre les utilisateurs , par
                        rapport à l'approche traditionnel public , l'approche Privé permet à l'émetteur de la publication d'être la seule personne qui puisse lire les commentaires , un
                        cas d'utilisation très utile dans le cas des objets trouvés , ainsi ce dernier doit inclure une question avec la description que seul le vrai propriétaire peut en répondre .
                    </p>

                    <p><span>&nbsp;&nbsp;</span>  <span style={{color:"#ff5774"}} className={"glyphicon glyphicon-chevron-right"}></span>
                        <strong style={{color:"#ff5774",fontWeight:"bolder"}}>Les notifications par mails : </strong> Esi-To-Find vous garde à jour en vous notifiant par mail pour chaque
                        interaction à votre publication ou au moment d'introduction d'un Object qui semblent répondre à vos critères </p>


                </div>



            </div>


            <div className={"col-xs-12 zero_pad"}>

                <div className={"col-xs-12 aide_head"} id={"art2"}>
                    Comment utiliser Esi-To-Find
                </div>
                <div className={"col-xs-12 aide_info"}>
                    <img alt={"comment utliser "} src={"https://api-esi-to-find.esi.dz/api/get_image_source/howtouse.PNG"} width={"100%"} />

                </div>



            </div>


            <div className={"col-xs-12 zero_pad"} id={"art3"}>

                <div className={"col-xs-12 aide_head"} >
                    Foundateur de Esi-To-Find
                </div>
                <div className={"col-xs-12 aide_info"}>
                    <p><strong>TCHOULAK NASSIM 1cs à l'école nationale supérieure d'informatique d'Alger</strong></p>

                </div>



            </div>

            <div className={"col-xs-12 end_style  "} >
                ESI TO FIND `@2019
            </div>


        </div>

        <div className={" aide_instruction"}>
            <Instruction></Instruction>
        </div>


    </div>



};

export default Aide ;