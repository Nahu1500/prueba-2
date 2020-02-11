let members = data.results[0].members
let dem = 0 ; rep = 0 ; ind = 0 ;
let stats = {
	"n_dem" : 0,
	"n_rep" : 0,
	"n_ind" : 0,
	"p_dem": 0,
	"p_rep": 0,
	"p_ind": 0,
}

const td = document.querySelector("tbody")

for (i = 0; i < members.length; i++) {
	if (members[i].party == "R") {
		stats.n_rep ++ 
		stats.p_rep += members[i].votes_with_party_pct 
	}
	else if (members[i].party == "D") {
		stats.n_dem ++
		stats.p_dem += members[i].votes_with_party_pct 
	}
	else {
		stats.n_ind ++
		stats.p_ind += members[i].votes_with_party_pct

	}
}
stats.p_dem /= stats.n_dem
stats.p_rep /= stats.n_rep
stats.p_ind != 0 ? stats.p_ind /= stats.n_ind : stats.p_ind = 0

let total_reps = stats.n_dem + stats.n_rep + stats.n_ind

let sum_prom= stats.p_dem + stats.p_rep + stats.p_ind

let total_prom 

stats.p_ind != 0 ? total_prom = sum_prom / 3 : total_prom = sum_prom / 2


td.innerHTML=`<tr><td>Republican</td><td>${stats.n_rep}</td><td>% ${stats.p_rep.toFixed(2)}</td></tr>
<tr><td>Democrat</td><td>${stats.n_dem}</td><td>% ${stats.p_dem.toFixed(2)}</td></tr>
<tr><td>Independent</td><td>${stats.n_ind}</td><td>% ${stats.p_ind.toFixed(2)}</td></tr>
<tr><td>Total</td><td>${total_reps}</td><td>% ${total_prom.toFixed(2)}</td></tr>`

let leastLoyal = []

members.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
for (i = 0; i < members.length*0.10 || members[i-1].votes_with_party_pct == members[i].votes_with_party_pct; i++){
	leastLoyal.push(members[i])
}

let mostLoyal = []

members.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
for (i = 0; i < members.length*0.10 || members[i-1].votes_with_party_pct == members[i].votes_with_party_pct; i++){
	mostLoyal.push(members[i])
}

let mostAttendance = []

members.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
for (i = 0; i < members.length*0.10 || members[i-1].missed_votes_pct == members[i].missed_votes_pct; i++){
	mostAttendance.push(members[i])
}

let leastAttendance =[]

members.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
for (i = 0; i < members.length*0.10 || members[i-1].missed_votes_pct == members[i].missed_votes_pct; i++){
	leastAttendance.push(members[i])
}
if(document.getElementById("attendance")!=null){
const td2 = document.getElementById("attendance")

for (i = 0; i < leastAttendance.length; i++) {
	let row2 = td2.insertRow(-1);
	row2.innerHTML=`<td><a target="_blank" href="${leastAttendance[i].url}">${leastAttendance[i].first_name} ${leastAttendance[i].last_name}<a></td>
    <td>${leastAttendance[i].missed_votes}</td>
    <td>% ${leastAttendance[i].missed_votes_pct}</td>`
}

const td3 = document.getElementById("attendance2")

for (i = 0; i < mostAttendance.length; i++) {
	let row3 = td3.insertRow(-1);
	row3.innerHTML=`<td><a target="_blank" href="${mostAttendance[i].url}">${mostAttendance[i].first_name} ${mostAttendance[i].last_name}<a></td>
    <td>${mostAttendance[i].missed_votes}</td>
    <td>% ${mostAttendance[i].missed_votes_pct}</td>`
}
}
else{
const td4 = document.getElementById("mostloyal")

for (i = 0; i < mostLoyal.length; i++) {
	let row4 = td4.insertRow(-1);
	row4.innerHTML=`<td><a target="_blank" href="${mostLoyal[i].url}">${mostLoyal[i].first_name} ${mostLoyal[i].last_name}<a></td>
    <td>${(mostLoyal[i].votes_with_party_pct * mostLoyal[i].total_votes/100).toFixed(0)}</td>
    <td>% ${mostLoyal[i].votes_with_party_pct}</td>`
}

const td5 = document.getElementById("leastloyal")

for (i = 0; i < leastLoyal.length; i++) {
	let row5 = td5.insertRow(-1);
	row5.innerHTML=`<td><a target="_blank" href="${leastLoyal[i].url}">${leastLoyal[i].first_name} ${leastLoyal[i].last_name}<a></td>
    <td>${(leastLoyal[i].votes_with_party_pct  * leastLoyal[i].total_votes/100).toFixed(0)}</td>
    <td>% ${leastLoyal[i].votes_with_party_pct}</td>`
}
}

/*
let data
let url ="https://api.propublica.org/congress/v1/113/senate/members.json"
let init = {
	method: 'GET',
	headers: {
		"Api-Key": 'UL40CNmcLPN8dDKujznQbsNXthEqY0XiwNmWEXEo',
		"Content-Type": 'application/json',
	},
	body: {
		
	}
}

fetch(url, init)
	.then(function(res){
		if(res.ok){
			return res.json()
		} else{
			throw new Error(res.status)
		}
	})
*/
