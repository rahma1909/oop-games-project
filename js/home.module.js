import { Details } from "./detils.module.js"
import { Ui } from "./ui.module.js"

export class Home {
    constructor(){
        document.querySelectorAll(".nav-link").forEach((e)=>{
            e.addEventListener("click",()=>{
                this.changActive(e)
                const category = e.dataset.category
                this.getGames(category)
              
            })

        })
        this.details = document.getElementById("details")
        this.games = document.getElementById("games")
        this.ui =new Ui()

        // this.detailsSection = new Details()
        this.getGames("mmorpg")
      
    }
     changActive(e){
        document.querySelector(".navbar-nav .active").classList.remove("active")
               e.classList.add("active")
       
    }

     async getGames(cat){
        const loading = document.querySelector(".loading");
      loading.classList.remove("d-none");
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4e09eb0963msh1af42b5b01db44bp17925ajsn95203c68a4e9',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`, options);
        
            const response = await api.json() 
              console.log(response);
              this.ui.displayDataGame(response)
              loading.classList.add("d-none");
              document.querySelectorAll(".card").forEach((card)=>{
                card.addEventListener("click",()=>{
                    this.details.classList.remove("d-none")
                    this.games.classList.add("d-none")
                    new Details(card.dataset.id)
                   
                })
              })

    }
}