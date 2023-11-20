import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  readOnly: false,
  showChat: false,
  showSurfaceDetails: false,
  showFrontDetails: false,
  showSeepageDetails: false,
  syncKassenzeichen: false,
  additionalLayerOpacities: {
    nrwAlkisFstck: 0.7,
    nrwAlkisGebaeude: 0.7,
  },
};

const slice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setReadOnly(state, action) {
      state.readOnly = action.payload;
      return state;
    },
    setShowChat(state, action) {
      state.showChat = action.payload;
      return state;
    },
    setShowSurfaceDetails(state, action) {
      state.showSurfaceDetails = action.payload;
      return state;
    },
    setShowFrontDetails(state, action) {
      state.showFrontDetails = action.payload;
      return state;
    },
    setShowSeepageDetails(state, action) {
      state.showSeepageDetails = action.payload;
      return state;
    },
    setSyncKassenzeichen(state, action) {
      state.syncKassenzeichen = action.payload;
      return state;
    },
    setLayerOpacity(state, action) {
      const { layer, opacity } = action.payload;
      state.additionalLayerOpacities[layer] = opacity;
      return state;
    },
  },
});

export default slice;

export const {
  setReadOnly,
  setShowChat,
  setShowSurfaceDetails,
  setShowFrontDetails,
  setShowSeepageDetails,
  setSyncKassenzeichen,
  setLayerOpacity,
} = slice.actions;

export const getReadOnly = (state) => {
  return state.settings.readOnly;
};

export const getShowChat = (state) => {
  return state.settings.showChat;
};

export const getShowSurfaceDetails = (state) => {
  return state.settings.showSurfaceDetails;
};

export const getShowFrontDetails = (state) => {
  return state.settings.showFrontDetails;
};

export const getShowSeepageDetails = (state) => {
  return state.settings.showSeepageDetails;
};

export const getSyncKassenzeichen = (state) => {
  return state.settings.syncKassenzeichen;
};

export const getAdditionalLayerOpacities = (state) => {
  return state.settings.additionalLayerOpacities;
};
