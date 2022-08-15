const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); // put all the classes in arr(Nodes)
let count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movies");

populateUI();

let ticketPrice = +movieSelect.value; // plus sign used to change string -> Integer

//Methods..

//Save selected movie index and price.

function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // ... means spread which copy the values of an array.
  //foreach is a loop just like for loop .. but map will return a new array.
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); // stringify used when dealing with array.

  let counter = selectedSeats.length;
  count.innerHTML = counter;
  total.innerHTML = counter * ticketPrice;
}


// get data from local storage.

function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats!==null && selectedSeats.length > 0 ){
    seats.forEach((seat, index)=> {
      if(selectedSeats.indexOf(index)> -1){
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
// 1st approach is to loop on seats with foreach and add event listener.
//or 2nd approach is to handle the whole container..

//event listeners

// Movie Select Listener..
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});


//initial count and total:

updateSelectedCount();