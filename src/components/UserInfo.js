export default class UserInfo {
    constructor(clases) {
        this._name  = document.querySelector(clases.name);
        this._job = document.querySelector(clases.job);
        this._avatar =  document.querySelector(clases.avatar);
    }

    getUserInfo() {
        return { name: this._name.textContent, job: this._job.textContent };
    }

    setUserInfo({ name, job }) {
        this._name.textContent  = name;
        this._job.textContent = job;          
    }
    
    setAvatar(link) {
        this._avatar.setAttribute('src', link);
    }
}