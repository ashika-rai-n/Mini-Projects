function updateClock() {
	const now= new Date();

	let h=now.getHours();
	let m=now.getMinutes();
	let s=now.getSeconds();

	// Adding leading zeroes
	h=h<10?"0"+h:h;
	m=m<10?"0"+m:m;
	s=s<10?"0"+s:s;

document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock,1000);
updateClock();

