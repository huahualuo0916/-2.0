import mitt from 'mitt';

export const emitter = mitt();

export const EVENTS = {
  START_LOCATION_SELECTION: 'start-location-selection',
  LOCATION_SELECTED: 'location-selected',
  CLEAR_MAP_MARKERS: 'clear-map-markers',
  CANCEL_LOCATION_SELECTION: 'cancel-location-selection',
  PLAN_ROUTE: 'plan-route'  
};