import { ofType } from 'redux-observable';
import { catchError, debounceTime, map, of, retry, switchMap, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { searchCity } from '../store/sliceChoice';
import { errorGetCity, requestGetCity, successGetCity } from '../store/sliceGetCity';
import { errorGetLastTickets, requestGetLastTickets, successGetLastTickets } from '../store/sliceGetLastTickets';
import { getRouteError, getRouteRequest, getRouteSuccess } from '../store/sliceGetTrainList';
import { errorGetSeats, requestGetSeats, successGetSeats } from '../store/sliceGetSeats';
import { errorPostOrder, requestPostOrder, successPostOrder } from '../store/slicePostOrder';
import { errorPostSubscribe, requestPostSubscribe, successPostSubscribe } from '../store/slicePostSubscribe';

const baseURL = import.meta.env.VITE_API_URL;

// Универсальная функция для выполнения запросов AJAX с повторными попытками
const ajaxWithRetry = (url, method = "GET", body = null) => {
  return ajax({ url, method, body }).pipe(
    retry(3),
    catchError((error) => of({ error }))
  );
};

// Утилита для обработки ошибок
const handleError = (actionCreator) => (error) =>
  of(actionCreator(error.message || "Unknown error"));

// Универсальная функция для создания epics GET-запросов
const createGetEpic = (actionType, urlBuilder, successAction, errorAction, requestAction) => (
  action$
) =>
  action$.pipe(
    ofType(actionType),
    debounceTime(500),
    switchMap((action) => {
      const url = urlBuilder(action);
      return of(requestAction(action.payload)).pipe(
        switchMap(() =>
          ajaxWithRetry(url).pipe(
            map((response) =>
              response.error ? errorAction(response.error) : successAction(response)
            ),
            catchError(handleError(errorAction))
          )
        )
      );
    })
  );

// Эпик для поиска городов
export const getCitiesEpic = createGetEpic(
  searchCity,
  (action) => `${baseURL}/routes/cities?name=${action.payload.trim()}`,
  successGetCity,
  errorGetCity,
  requestGetCity
);

// Эпик для получения маршрутов
export const getRoutesEpic = createGetEpic(
  getRouteRequest,
  (action) =>
    `${baseURL}/routes?from_city_id=${action.payload.fromCity._id}&to_city_id=${action.payload.toCity._id}`,
  getRouteSuccess,
  getRouteError,
  getRouteRequest
);

// Эпик для получения последних маршрутов
export const getLastTicketsEpic = createGetEpic(
  requestGetLastTickets,
  () => `${baseURL}/routes/last`,
  successGetLastTickets,
  errorGetLastTickets,
  requestGetLastTickets
);

// Эпик для получения доступных мест на маршруте
export const getSeatsEpic = createGetEpic(
  requestGetSeats,
  (action) => `${baseURL}/routes/${action.payload}/seats`,
  successGetSeats,
  errorGetSeats,
  requestGetSeats
);

// Эпик для создания заказа (POST запрос)
export const postOrderEpic = (action$) =>
  action$.pipe(
    ofType(requestPostOrder),
    switchMap((action) =>
      ajax({
        url: `${baseURL}/order`,
        method: "POST",
        body: JSON.stringify(action.payload),
      }).pipe(
        retry(3),
        map((response) => successPostOrder(response.response.status)),
        catchError(handleError(errorPostOrder))
      )
    )
  );

// Эпик для подписки на рассылку (POST запрос)
export const postSubscribeEpic = (action$) =>
  action$.pipe(
    ofType(requestPostSubscribe),
    switchMap((action) =>
      ajax({
        url: `${baseURL}/subscribe`,
        method: "POST",
        body: JSON.stringify(action.payload),
      }).pipe(
        retry(3),
        map((response) => successPostSubscribe(response.response.status)),
        catchError(handleError(errorPostSubscribe))
      )
    )
  );