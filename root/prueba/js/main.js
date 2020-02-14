let url
document.getElementById("table-data") != null ? url ="https://api.propublica.org/congress/v1/113/senate/members.json" : url ="https://api.propublica.org/congress/v1/113/house/members.json"
let init = {
	method: 'GET',
	headers: {
		"X-Api-Key": 'UL40CNmcLPN8dDKujznQbsNXthEqY0XiwNmWEXEo',
	}	
}
let members
 async function getData(url,init){
		 	await fetch(url, init)
		 	.then(function(res){
		 		if(res.ok){
		 			return res.json()
		 		} else{
		 			throw new Error(res.status)
		 		}
		 	})
		 	.then(function(json){
		 		let data = json
				members = data.results[0].members
				checkbox()
			})
		 	.catch(function(error){
		 		console.log(error)
		 	})
		}

getData(url,init)

let tbody 
document.getElementById("table-data") != null ? tbody = document.getElementById("table-data") : tbody = document.getElementById("table-data2")


function checkbox(){
	tbody.innerHTML =""
	let state = document.getElementById("inputState").value
	let party = document.getElementsByClassName("congress") 
	let select = []
	let dataFilter=[]
	for (let i = 0; i< party.length; i++) {
		if (party[i].checked) {
			dataFilter = members.filter(e => e.party == party[i].value)

			members.filter(e => e.party == party[i].value && (e.state == state || state == "all")). forEach(member => {
				let row = tbody.insertRow(-1);
				row.innerHTML=`<td><a target="_blank" href="${member.url}">${member.first_name} ${member.last_name}<a></td>
    			<td>${member.party}</td>
    			<td>${member.state}</td>
    			<td>${member.seniority}</td>
    			<td>${member.votes_with_party_pct}</td>`})
		}
		dataFilter.forEach(e => {
			if (select.indexOf(e.state)== (-1)) {
				select.push(e.state)

			}

		})
		document.getElementById("inputState").innerHTML = `<option value="all">all</option>`
		select.forEach(e => {document.getElementById("inputState").innerHTML += `<option value="${e}">${e}</option>`})
		document.getElementById("inputState").value = state
	}
}
document.getElementById("c1").addEventListener("click", checkbox)
document.getElementById("c2").addEventListener("click", checkbox)
document.getElementById("c3").addEventListener("click", checkbox)
document.getElementById("inputState").addEventListener("change", checkbox)
