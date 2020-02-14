let live 
document.getElementById("num")!= null ? live = "https://api.propublica.org/congress/v1/113/senate/members.json" : live = "https://api.propublica.org/congress/v1/113/house/members.json"
const app = new Vue({
    el: '#app',
    data:{
		 url: live,
		 init: {
			 method:'GET',
			 headers: {
				 "X-Api-Key": 'UL40CNmcLPN8dDKujznQbsNXthEqY0XiwNmWEXEo',
			 }
		 },
	   members: [],
	   n_rep: 0,
	   n_dem: 0,
	   n_ind: 0,
	   total_rep: 0,
	   total_dem: 0,
	   total_ind: 0,
	   total: 0,	
	   total_per: 0, 
	   prom_per: 0,
	   parties: [],  
	   leastAttendance: [], 
	   /*states:[],
	   stateAct: "All",*/
	   current: 'list',
	},
	created(){
		fetch(this.url, this.init)
		.then(function(res){
			if(res.ok){
				return res.json()
			} else{
				throw new Error(res.status)
			}
		})
		.then(function(json){
			let data = json
			app.members = data.results[0].members
			app.parties = app.getKeyValue(app.members,"party")
			app.n_dem = app.numbers(app.members,"party","total_dem","D")
			app.n_rep = app.numbers(app.members,"party","total_rep","R")
			app.n_ind = app.numbers(app.members,"party","total_ind","I")
			app.total = app.n_dem + app.n_ind + app.n_rep			
			app.total_per=	app.total_dem + app.total_rep + app.total_ind
			app.total_ind != 0 ? app.prom_per = app.total_per / 3 : app.prom_per = app.total_per / 2
			app.leastAttendance = app.votes(app.members)					
			/*app.states = app.getKeyValue(app.members,"state")*/	
		})
		.catch(function(error){
			console.log(error)
		}) 
	},
	methods:{
		getKeyValue(array,key){
			let result = []
			array.forEach(e => !result.includes(e[key]) ? result.push(e[key]) : null)
		
			return result
		},
		numbers(array,key,key2,letter){
			let sum = 0
			for (i = 0; i < array.length; i++) {
				if (array[i][key] == letter) {
					sum ++
					app[key2]+=array[i].votes_with_party_pct
				}
			}
			app[key2] /= sum
			return sum
		},
		votes(array){
			let attendance = []
			array.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
			for (i = 0; i < array.length*0.10 || array[i-1].missed_votes_pct == array[i].missed_votes_pct; i++){
			attendance.push(array[i]) 
			}
			return attendance
		},
	},
	computed:{
		/*filter(){
			return this.members.filter(e => app.parties.includes(e.party) && (e.state == app.stateAct || app.stateAct == "All"))
		}*/
	}
})

//votes_with_party_pct