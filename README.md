# Snake-GrabJS-Demo

This is a demo for the GrabJS library. In order to run the demo, clone this repo, and open ```index.html``` on your browser. If this is not to your speed, here is a  [link to the live demo](https://pumzy.github.io/Snake-GrabJS-Demo/).

## GrabJS usage in this project

### Setting up the canvas for snake

In order to manipulate the HTML canvas using JavaScript, I used the following GrabJS selector in order to access it when the page loads:

```javascript
$g.ready(() => {

  const canvas = $g("canvas").elements[0]
  const context = canvas.getContext("2d")

```


### Making buttons responsive

In order to make the buttons responsive, I used the GrabJS ```on``` method in order to set up the relevant event handlers.

```javascript
$g('button').on("click", (e) => {
  ....
}
```

To select the body in order to change its background I used another GrabJS selector:

```javascript
  let body = $g("body").elements[0]
```

### Random background generation

 In order to dynamically generate backgrounds for the page I use the ```$g.ajax``` function to hit the Splashbase API and get a random image. The code for this is as follows:

```javascript
$g.ajax({
  method: 'GET',
  url: 'http://www.splashbase.co/api/v1/images/random',
  success: (data) => {
    let body = $g("body").elements[0]
    debugger
    body.style.backgroundImage = ``
    body.style.background = `url(${JSON.parse(data).url})`
    body.style.backgroundSize = 'cover'
  }
})
```
