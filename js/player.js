// vanilla audio player

function $(id) { return document.getElementById(id); };
const media = $('audio');

let ui = {
  play: 'playAudio',
  audio: 'audio',  
  currentTime: 'currentTime'
};

function togglePlay() {
  if (media.paused === false) {
    media.pause();
    $(ui.play).classList.remove('pause');
  } else {
    media.play();
    $(ui.play).classList.add('pause');
  }
}

function calculateCurrentValue(currentTime) {
  const currentMinute = parseInt(currentTime / 60) % 60;
  const currentSecondsLong = currentTime % 60;
  const currentSeconds = currentSecondsLong.toFixed();
  const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
  currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
  }`;
  
  return currentTimeFormatted;
}

function showTime() {
  const currentTime = calculateCurrentValue(media.currentTime);
  $(ui.currentTime).innerHTML = currentTime;

  media.onended = () => {
    $(ui.play).classList.remove('pause');
    $(ui.currentTime).innerHTML = '00:00';
  };  
  
  calculatePercentPlayed();
}

$(ui.play).addEventListener('click', togglePlay)
$(ui.audio).addEventListener('timeupdate', showTime);
