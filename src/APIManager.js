// I spent many hours trying to achieve this wo/ using redux
const throttleTime = 100;

class APIManager {

  constructor() {
    if (!APIManager.instance) {
      APIManager.instance = this;
    }
    this.APIToken = "";
    this.currentSearchTab = 'artist';
    this.APICalledTime = new Date().getTime();
    this.ablumDetailIdx = 0;
    this.ablumAPIList = [];
    this.playListIndex = 0;
    this.playList = [];

    return APIManager.instance;
  }

  getToken() {
    return this.APIToken;
  }

  setToken(token) {
    this.APIToken = token;
  }

  getCurrentTab() {
    return this.currentSearchTab;
  }

  setCurrentTab(tab) {
    this.currentSearchTab = tab;
  }

  // this function throttles our API call
  // true means we can run it
  // TODO we need to update this to a debouncer
  throttleAPI() {
    return true;
    let thisCallTime = new Date().getTime();
    let retVal = (thisCallTime - this.APICalledTime > throttleTime);
    this.APICalledTime = thisCallTime;
    return retVal;
  }

  setAblumList(list) {
    this.ablumAPIList = list;
  }

  getAblumList() {
    return this.ablumAPIList;
  }

  setAblumIdx(idx) {
    this.ablumDetailIdx = idx;
  }

  getAblumIdx() {
    return this.ablumDetailIdx;
  }

  setPlayList(list) {
    this.playList = list;
  }

  getPlayList() {
    return this.playList;
  }

  setPlayListIndex(idx) {
    this.playListIndex = idx;
  }

  getPlayListIndex() {
    return this.playListIndex;
  }


}

const inst = new APIManager();
export default inst;
