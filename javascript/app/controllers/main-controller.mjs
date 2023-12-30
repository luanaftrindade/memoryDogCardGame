import levelOneView from '../views/level-one-view.mjs';
import levelTwoView from '../views/level-two-view.mjs';
import apiService from '../services/dog-api-service.mjs';

const externals = {};
const internals = {};

// Flag to track whether images have been fetched
let imagesFetched = false;

externals.start = function () {
    internals.levelOneViewHandler();
    internals.levelTwoViewHandler();

};

internals.levelOneViewHandler = async function () {
    try {
        // Only fetch images if not already fetched
        if (!imagesFetched) {
            const images = await apiService.getDogImages();
            console.log(images);
            
         
            levelOneView.attachEventListeners(images);

            // Set the flag to true to indicate images have been fetched
            imagesFetched = true;
        } else {
            console.log('Images already fetched. Skipping additional requests.');
        }
    } catch (error) {
        console.log("Error handling button click:", error);
    }
};


internals.levelTwoViewHandler = async function () {
    try {
        if (!imagesFetched) {
            const images = await apiService.getDogImages();
            console.log(images);
            levelTwoView.attachEventListeners(images);
            imagesFetched = true;
        } else {
            console.log('Images already fetched. Skipping additional requests.');
        }
    } catch (error) {
        console.log("Error handling button click:", error);
    }
};

export default externals;