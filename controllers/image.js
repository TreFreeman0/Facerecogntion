// const Clarifi = require('clarifai');

const returnClarifaiOptions = (image) => {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // In this section, we set the user authentication, user and app ID, model details, and the URL
    // of the image we want as an input. Change these strings to run your own example.
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '2a3af9c2a0874452ad87c65890924000';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'treyy0';       
    const APP_ID = 'Face-Recgontion-2424';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'general-image-recognition';
    const IMAGE_URL = image;

const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };


return requestOptions



}


const handleAPIcall = (req, res) => {
    fetch(
      `https://api.clarifai.com/v2/models/face-detection/outputs`,
      returnClarifaiOptions(req.body.input)
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        return res.json(result);
      })
      .catch((err) => res.status(400).json("Unable to communicate with API"));
  };
  

const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
      // entries[0] --> this used to return the entries
      // TO
      // entries[0].entries --> this now returns the entries
      res.json(entries[0].entries);
    })
    .catch(() => res.status(400).json('unable to get entries'))
  }

module.exports = {
    handleImage,
    handleAPIcall

}