import axios from 'axios';

export class PhotoService {

    getImages() {
        return fetch('assets/demo/data/photos.json').then(res => res.json())
                .then(d => d.data);
    }
}
     