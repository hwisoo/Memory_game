// NBA Memory Game

(function(){

	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		

		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1200);
			

		},

		showModal: function(){
			var wins = 0;
			wins = wins +1;
			this.$overlay.show();
			this.$modal.fadeIn("slow");
			$("p.counter").html(wins);
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="img/nba.jpg"\
				alt="NBA" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "Bill Russell",
			img: "img/billrussell.jpg",
			id: 1,
		},
		{
			name: "Wilt Chamberlain",
			img: "img/wilt.jpg",
			id: 2
		},
		{
			name: "Oscar Robertson",
			img: "img/oscar.jpg",
			id: 3
		},
		{
			name: "Jerry West",
			img: "img/jerry.jpg",
			id: 4
		},
		{
			name: "Kareem Abdul-Jabbar",
			img: "img/kareem.jpeg",
			id: 5
		},
		{
			name: "Julius Erving",
			img: "img/doc.jpg",
			id: 6
		},
		{
			name: "Magic Johnson",
			img: "img/magic.jpg",
			id: 7
		},
		{
			name: "Larry Bird",
			img: "img/larry.jpg",
			id: 8
		},
		{
			name: "Michael Jordan",
			img: "img/jordan.jpeg",
			id: 9
		},
		{
			name: "Hakeem Olajuwon",
			img: "img/hakeem.jpg",
			id: 10
		},
		{
			name: "John Stockton",
			img: "img/john.jpg",
			id: 11
		},
		{
			name: "Karl Malone",
			img: "img/karl.jpg",
			id: 12
		},
		{
			name: "Shaquille O'Neal",
			img: "img/shaq.jpg",
			id: 13
		},
		{
			name: "Jason Kidd",
			img: "img/kidd.png",
			id: 14
		},
		{
			name: "Allen Iverson",
			img: "img/ai.jpg",
			id: 15
		},
		{
			name: "Kobe Bryant",
			img: "img/kobe.jpg",
			id: 16
		},
		{
			name: "Tim Duncan",
			img: "img/timmy.jpg",
			id: 17
		},
		{
			name: "Dirk Nowitzki",
			img: "img/dirk.jpg",
			id: 18
		},
		{
			name: "Lebron James",
			img: "img/lebron.jpg",
			id: 19
		},
		{
			name: "Kevin Durant",
			img: "img/kd.jpg",
			id: 20
		}

	];

	Memory.init(cards);


})();
