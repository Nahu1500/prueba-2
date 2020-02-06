const tbody = document.querySelector("tbody")

const members =data.results[0].members


function checkbox(){
	document.getElementById("table-data").innerHTML =""
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
checkbox()
document.getElementById("inputState").addEventListener("change", checkbox)
