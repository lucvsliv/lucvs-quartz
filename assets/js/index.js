const text = `
   __        __   _                            _        
   \\ \\      / /__| | ___ ___  _ __ ___   ___  | |_ ___  
    \\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ | __/ _ \\ 
     \\ V  V /  __/ | (_| (_) | | | | | |  __/ | || (_) |
      \\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|\\___|  \\__\\___/ 
`;

let i = 0;
function typeEffect() {
  if (i < text.length) {
    document.getElementById('ascii-art').innerHTML += text[i];
    i++;
    setTimeout(typeEffect, 50); // Adjust speed here
  }
}
typeEffect();
