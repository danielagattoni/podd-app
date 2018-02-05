import {
  REQUEST_FEATURED_PIES,
  RECEIVE_FEATURED_PIES_SUCCESS,
  RECEIVE_FEATURED_PIES_ERROR,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  SORT_PRICE,
} from 'actions/featuredPies.js';

const filterStores = (stores) => (stores.filter(store => store.pieOfTheDay !== null));
const getFeaturedPie = (pies) => (pies.find(pie => pie.isPieOfTheDay) || null);
const sortPriceAsc = (a, b) => (a.pieOfTheDay.price - b.pieOfTheDay.price);
const sortPriceDesc = (a, b) => (b.pieOfTheDay.price - a.pieOfTheDay.price);
const ASC_SORT = 'asc';

function mapStores(stores) {
  return stores.map(store => ({
    store: {
      id: store.id,
      displayName: store.displayName,
      address: store.address,
      rating: store.rating,
      mobile: store.mobile,
      city: store.city,
      state: store.state,
      postcode: store.postcode,
      coords: store.coords,
    },
    pieOfTheDay: getFeaturedPie(store.pies)
  })
)};

function sortBy(arr, defaultSort) {
  return defaultSort === ASC_SORT ? arr.sort(sortPriceAsc) : arr.sort(sortPriceDesc);
}

export default function featuredPies(state = {}, action) {
  switch (action.type) {
    case REQUEST_FEATURED_PIES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_FEATURED_PIES_SUCCESS:
      const filteredData = filterStores(mapStores(action.featuredPies));
      return Object.assign({}, state, {
        items: sortBy(filteredData, action.defaultSort),
        isFetching: false
      });
    case RECEIVE_FEATURED_PIES_ERROR:
      return Object.assign({}, state, {
        isFailure: true
      });
    case INCREMENT_PAGE:
      return Object.assign({}, state, {
        page: state.page + 1
      });
    case DECREMENT_PAGE:
      if (state.page === 1) {
        return state;
      }
      return Object.assign({}, state, {
        page: state.page - 1
      });
    case SORT_PRICE:
      const sortedItems = sortBy([...state.items], action.defaultSort);
      return Object.assign({}, state, {
        items: sortedItems,
        defaultSort: action.defaultSort
      });
    default:
      return state;
  }
}


/*

featuredPies: {
  items: [],
  isFetching: false,
  isFailure: false,
  page: 1
},

*/
