const config = require("./../config/config");
const spotify = require("./../services/spotify");

const searchArtists = async (req, res, next) => {
  const term = req.query.term;

  if (!term) {
    const error = new Error("Must provide search term");
    error.clientMessage = "Must provide search term";
    error.status = 400;
    return next(error);
  }

  try {
    //search artists via spotify api
    let artists = await spotify.getArtists(term);

    artists = artists.map(artist => {
      return {
        id: artist.id,
        name: artist.name
      }
    });

    //send back artists
    res.status(200);
    res.json({
      success: true,
      message: "search successful",
      data: {
        artists
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports.searchArtists = searchArtists;