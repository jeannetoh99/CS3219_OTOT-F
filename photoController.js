const axios = require('axios');
const Redis = require('redis');

const redisClient = Redis.createClient();

const DEFAULT_EXPIRATION = 3600

const getPhotos = async (req, res) => {
    const albumId = req.query.albumId;

    const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
        const { data } = await axios.get(
            "http://jsonplaceholder.typicode.com/photos",
            { params: { albumId } }
        );
        return data;
    })

    res.json(photos);
};

const getPhotoById = async (req, res) => {

    const photo = await getOrSetCache(`photo:${req.params.id}`, async () => {
        const { data } = await axios.get(
            `http://jsonplaceholder.typicode.com/photos/${req.params.id}`,
        )
        return data;
    })

    res.json(photo);
};

const getOrSetCache = (key, callback) => {
    return new Promise ((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) return reject(error);
            if (data !== null) return resolve(JSON.parse(data));
            const freshData = await callback();
            redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
            resolve(freshData)
        })
    })
}

module.exports = {
    getPhotos,
    getPhotoById,
};
