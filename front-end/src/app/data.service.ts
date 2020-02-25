import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private static URL = 'https://limehome-challenge.herokuapp.com/'; // For local development 'http://127.0.0.1:' + environment.port
  private selectedPropertyId$: BehaviorSubject<string>;
  private __properties$: BehaviorSubject<Property[]>;
  private __bookings$: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.selectedPropertyId$ = new BehaviorSubject<string>(null);
    this.__properties$ = new BehaviorSubject<Property[]>(null);
    this.__bookings$ = new BehaviorSubject<any>(null);
  }

  queryProperties(lat: number, lng: number) {
    // return new BehaviorSubject<Property[]>(bla).asObservable();
    this.http.get<Property[]>(DataService.URL + '/properties?at=' + lat + ',' + lng)
      .subscribe(value => this.__properties$.next(value));
  }

  getProperties$() {
    return this.__properties$.asObservable();
  }

  async createBooking(id, start, end): Promise<any> {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    const req = await fetch(DataService.URL + '/bookings', {
      method: 'POST',
      headers: header,
      body: JSON.stringify( {id, start, end} )
    });
    console.log(req);
    return req.json();
  }

  getSelectedPropertyId(): Observable<string> {
    return this.selectedPropertyId$.asObservable();
  }

  updateSelectedPropertyId(id: string ) {
    this.selectedPropertyId$.next(id);
  }

  queryBookings() {
    this.http.get<any>(DataService.URL + '/bookings')
      .subscribe(value => this.__bookings$.next(value));
  }

  getBookings() {
    return this.__bookings$.asObservable();
  }

}

export interface Property {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  photoUrl: string;
}

// Can be used for offline development
// let bla = [{id: '82cba786d2ace8ea5864d4e9ca277598a89b99b8', name: 'Platzl Hotel', lat: 48.13801240000001, lng: 11.5788714, rating: 4.5, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAKwFZtvoFH4HVnNh0Sy2VOmpK9rX3o6yQ6aDUxVYXnTWrNX_BMVCTFezUmn3ZeOtAUnOSoEZZsFZ6-ED0T6suClE0mZUSdUB1k3f5czASwltOB15o-5pW51Nq_CNIej-NEhDqisgepT4ju2khD7htIOA3GhSukhqE_LuEIjH3Xgsu-D8jb3xW_g&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: 'd45a15a9d22e845b476cb87159a1784ecf895e2d', name: 'Cortiina Hotel', lat: 48.13683880000001, lng: 11.5794239, rating: 4.5, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAA7zhgwDNUXECyRZlMx5qi0IUzhzJ9h_4NI2zbjIjSCdXpx-NNAHJW3z6DdaLPL6osrLBci4yS7NsFg0hmpxmzbkOgKUgVitzqOsjTIumG_WnvE8KNgTtCH3nRlv1qFifBEhCgX8NvyGWCDtt7g-GF-TgOGhR34z0cbG7dOkQrtfp_pIfxnprE_A&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '1c30dd37c66e6355dccd996fe28b1638ab5f28f3', name: 'Hotel Bayerischer Hof, Munich', lat: 48.1404266, lng: 11.5730982, rating: 4.4, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAfYPzDNxU82Ao1VQxyepjFehFeNXhZKqyZZIqVzleyUvM4APg-96zgP6c9TwYoOyZiqlFzNyReostFMx6ucOV_cMzwuNMvw6ML38JpkYOZdwVQwWKG-ZnEIxyjPS52vajEhB7ZULu8fiG8DYD8eBWpTGGGhS7-qP6JkVD7uS_nHHPulP9LZPivw&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '6bebd8d15d021eba9cc3770237b3b0370d94f1fc', name: 'Hotel Vier Jahreszeiten', lat: 48.1389339, lng: 11.581815, rating: 4.6, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAp_PqwgOFKw-KbKISunbMeAanwEIdC_PWN1P_QaWaRFO2bJcalMRobPSeemOkKNJBsc1rBeWbWWvlQNRqDIbDDZCkBfgsDXDXf1gnxUBvzN4K-4nr-PgK9Jmbuu-EH1o6EhAX81SdAEPQBcOo3Zcu_WiAGhT1hFR7J_0rxrj-39LGSzZfU-dzQA&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: 'a8c14e8e8d35eaf630473ed71df4dfb2fae7d5e8', name: 'Hotel Motel One München-Sendlinger Tor', lat: 48.1347491, lng: 11.5669201, rating: 4.5, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAso87Gfm1fwCGm6aaqfv68d0PEye_GDdlIfzOxinCWpZfa-qVpsxwPvGh9L5rzkR9Z5BTU6jixVNAiHrLSsOwEmtVRGamlEPeM8HDNWDHtStTUKpo6EH4O8BeB9wSk6GNEhAhJlw45Xi3nKoaA1PNVJURGhQlmpfMSyotIJhjkqTEsJOOAS1k8Q&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: 'a009bc370686c62a723cb1f129b79a65990c7299', name: 'Hotel Opera', lat: 48.1388378, lng: 11.5870394, rating: 4.2, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAA0y9ppYtxgzHuT621URq51g3PER5L44JEQ0wt_lhBzKBW-FUvix12dW5RWkQLGSZetYbSNYql1Ixkq6-0UM7wRZgSgw5aiRC4RxUNFJhufPO85wNkJvK_yEMoFNJoI6OmEhB8hJJ8LdrXtFVYey2xxX0LGhQx3sckufdAKhMCTqPBNTH6SVCw7g&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '419e59c8e7660f070516922321a9661eaad66603', name: 'Excelsior by Geisel', lat: 48.139801, lng: 11.562207, rating: 4.6, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAUaaytVtMy_ElcsuZyq4gaY9RYxkaMbsZ-dYlp4nLY3oXiEYamrPVZVQ2sTEgoBCL5s-Ec28YMPMx3DKDNHkyZy4n7l1lrssKV2rJPXbg2UFq_9t6Tiiqfuw_AvfpKPIhEhDzUg_xSoZ-95WIro4L9zPjGhTtXH6sMYJFlI7P0_M9nxN12IU8XQ&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '9edde6ec47c242e0aae4278ef1e71ade086d2102', name: 'Hotel Monaco', lat: 48.138088, lng: 11.561377, rating: 4.3, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAA6YoFQXT1OMm4LVrG22IlzNYKWRxkpa2z1y4V015DCO6qBPAY5iZvVzOA2qIsypi9X-Nun3QCBwVd4VaWd4PEOqe_18B_cfJSp7fDDFERUDjTLadnPA8JE1C_U3xNSOH5EhDfbKTv-7m2FIcLBkmoHC5sGhSWR_IBQGZD0lksVe9f8vKT6DIPjg&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: 'c522e95caf1109e83a33d38394829949597510a4', name: 'Leonardo Boutique Hotel München', lat: 48.147436, lng: 11.576406, rating: 3.5, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAKxhzE8v9KtO0qTePGkoSKxO4k7sz_VK7nW6UimLHjMuyEzvPTSsSXDMFiwfDlu6-OCoRM-DbV42xU8Le6IFv1VE3hPDgM_BplMxojTh_zUfT4M0sMBZv6FIblDIYn9bWEhAuZsnfIbgkNfzKuTwQxXgPGhSl7dKlbMVtn4AoQ_XrUvRli4mDwA&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '2c9742135a1b277dd754fce50b2383183ec4d70c', name: 'Mercure Hotel Muenchen City Center', lat: 48.1381485, lng: 11.5601837, rating: 4.4, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAfej4j7U8U7TINTFkv7WymE22V4OK_9GGCPE59vDi4M6Ekb_MfKePegh1sq8uYLOdI_6buJjMw8ZhmATPMwob76r5qxq7A1TZWXegFgNe_J9LxuOHoHfMPz2zIlXGOZu0EhDtBjyP1Ou2gMdjcLAB5D3oGhTOfwzc8dnKe_1lYAehG4lpt4VikA&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '7ae1edc178481e6e2a9d7c81e8724f7476e4a5a5', name: 'Hotel Cristal', lat: 48.1375634, lng: 11.5591702, rating: 3.8, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAmJsTWby0Hr8QYNxSjPqxJY1i5sFiTrlwR08nsGCYfUmWAx0QmfYOdAVgHJApRET4grNSnXL42lUFGqvrR0UpOa3EcwxCJVdVuJHvCDuv0nC_JEBOZQPB_FMfFsS0wcNaEhAzr2dm28Q38wubz-U2NBKUGhRv41hWHTyPvICNk1IW8dymXiqhAw&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: 'c648c1d0348a4d6c975936381441583129c49b16', name: 'Eden Hotel Wolff', lat: 48.14169459999999, lng: 11.5591645, rating: 4.3, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAdySwb72yldmrobSu_6AEt1-aNxyjYIJq_wyd92izmjth3rNuEP6btO4-jC5L3U6S_pXTxNJZO1MqaoOrRMV0fMSWiIXFkQIwE95wtQQ6IuRHwUgJOZMEwonFODTQG6ydEhCkHIYtsrTucwHtQEud--kCGhSicZUClAvaJMrCj6jw8KQXMUEaWw&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '1e7a55423b9f6ba73b1f265e9ae8024af7b56ee8', name: 'Le Méridien Munich', lat: 48.1389791, lng: 11.5579471, rating: 4.2, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAaqcMJ5huGi3rnWbhD5TkYbPInZ4HDH4LtpVnBEs321QBbIo1SqzLp7CALeMKDc-ZIE9gorw65bY4GEC9fxGIN62-IcTBmmfIeB0Xe5LBF2zHDbinPZq-smAKS5DLv2ivEhD2FVXAk2LtbOnoCfpuUHs5GhRaTPjvROoVcQyNXOmcjkqy1X3vmQ&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '68574edd1b7631152451cc0f3746cfe2c985f6d4', name: 'Holiday Inn München - Stadtzentrum', lat: 48.1304208, lng: 11.589808, rating: 4.2, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAA6tg6XUGm90_Pon5QHOopOd5t8LDR2IWDkdIKA-SjB8z_zdjnHZqxga24FEOCZ5wXp10M5tjX9rPH4D1S-RjIxIy_bjcI14q3b9YrbENaXKwrgffVDOjkbkdema0Ccr96EhCQquAJe5tECwTqiTIeQWdXGhQiOBWGFS2aZ60QueoKkwX1udsAnw&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '77eb0d4a12c68605d3a1220350dd33cb197c72ac', name: 'Hotel Novotel Muenchen City', lat: 48.1294139, lng: 11.5893167, rating: 4.3, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAMCW1FWD5CuDRo8Cp-0lz0kUubCxJEFVqqM-m0GL2ALQsGnQ3N7rhD73fnbzSv3YSWmtbXN6acV2TZN3Y4-NDKdXDsgdYfhcbff8CB2-qBpNQBjstfxlhsFx79w7jaPzCEhCKaZtkTG2KQYn5EGTB1vDNGhSgwoeudU6QpOi8nbdJezUp1aXB4Q&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '068cbaa72de55356933b71e506cf2862d438a84c', name: 'ibis Hotel München City', lat: 48.144045, lng: 11.559642, rating: 3.9, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAgdn0UsmUDxU9C6Ddex4WwWftOf8ysN7EodIneItrnhUEux3EBIruUH6nnrM2nD51Tu5LXr6QacEB0FEl8jOJ3nd-Yh6NG1Y9LIsoMGU7h-d9vyJjoLShbZDtmr5PYWtvEhBoNJLDa5-tKdzTqngNYjeZGhRsb-3QwdzTi8q9Nkze_op-X0RnwQ&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: 'b50f9fb551fc8379e4306cead7be8405fd366728', name: 'Sofitel Hotel Munich Bayerpost', lat: 48.1394952, lng: 11.5567695, rating: 4.5, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAjr4ocAt2iL1MJ8jKoJIUX1FDIZWiwrWYsxk7mzBP9kQA11eP693pNn4PWRpVfE4m97noPr4QQKcZXgp8tTbaRKFcsU7I8ARrBWoj3vvDYInoXxK3CQ0zTrjAttRN8HtuEhB2714avoieIKUX8EIa1ub2GhTQ-6b_ILlAHH840HdqaG-cxZdCqg&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '14b9db89900f2afc6b25b3b30ce49de1d76fd6c3', name: 'Hotel Motel One Munich-Deutsches Museum', lat: 48.1280312, lng: 11.5881993, rating: 4.4, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAyhlOvmLXAjOl_VTfNHvJSvCMchZa0Kg7HKAy93aqTs2LOS7B88qRu685OLkV9hm6FVYkfiehv9XhMCwm65vBBGlN7mjgB1ZvLnwnTI2vtfDqZfgH50TDtE1yqRZrLpEfEhCrL8BJOJD-Qmv1Z4xZAaQFGhQS44-iSmXTS3wtk3curvVFeRFMrw&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: '6c37d1d55aef3aa08953285253c1878d40a70698', name: 'Hotel Prinz München', lat: 48.1245253, lng: 11.5859662, rating: 4.1, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAA8FQyMwPOWCm9Z7XZvQYgJsQi8ryXFnlkQieN8x-Mav-oqZjiLUUHavqTPeVbf5QDcqAcA815PBcpAXUGJy-cKXQNUlWrkevbYEtjAyOXQ42NAyUh00UctjuJKdC7xyWwEhA6zh4ZRFA8DMV6hPsiiUuIGhRF44Gbti60kpQ-q65owFouVKxBOw&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}, {id: 'eb33da7a9bc523bf83144fb1f53200718a632c44', name: 'Bavaria Boutique Hotel', lat: 48.13561749999999, lng: 11.5459523, rating: 4.5, photoUrl: 'https://maps.googleapis.com/maps/api/place/photo?photoreference=CmRaAAAAi3MxJBpEdT2WB_Q9eG-SfFF5sbOBsYvxo31eZIVzHqvVzl2xutMXxiLbV_34yhtCqrcKCo8nAjbX1WuQXCZpoboIL9EaBD6jFsEfEu3oTVoQJ_CULglCu7QuqpPjE8eCEhC8oV8mVG0vsehleEjuPn-xGhSepV4UqAb94nhh6Ogc8O3JO05Zqw&sensor=false&maxheight=2000&maxwidth=3000&key=AIzaSyAxHCkGzQsG_MyX_Hyun5bY3U0_plw254A'}];
