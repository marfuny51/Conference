const INFO_LOADING='INFO_LOADING';
const INFO_ERROR='INFO_ERROR';
const INFO_SET='INFO_SET';
const INFO_SORT='INFO_SORT';

const infoLoadingAC=function() {
  return {
    type: INFO_LOADING,
  };
}

const infoErrorAC=function() {
  return {
    type: INFO_ERROR,
  };
}

const infoSetAC=function(info) {
  return {
    type: INFO_SET,
    info:info,
  };
}

const infoSortAC=function(info) {
  return {
    type: INFO_SORT,
    info:info,
  };
}

export {
    infoLoadingAC,INFO_LOADING,
    infoErrorAC,INFO_ERROR,
    infoSetAC,INFO_SET,
    infoSortAC,INFO_SORT,
}
