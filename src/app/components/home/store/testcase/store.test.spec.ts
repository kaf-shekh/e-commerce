// import { fakeAsync, TestBed, tick } from "@angular/core/testing";
// import { EffectsRunner } from "@ngrx/effects/src/effects_runner";
// import { Observable } from "rxjs";
// import { ArticleService } from "src/app/service/article.service";
// import { HomeEffects } from "../effects/auth.effects";

// describe('HomeEffects', () => {
//   let runner, homeEffects, postsService;

//   beforeEach(() => TestBed.configureTestingModule({
//     imports: [
//     ],
//     providers: [
//       HomeEffects,
//       {
//         provide: ArticleService,
//         useValue: jasmine.createSpyObj('postsService', ['get'])
//       }
//     ]
//   }));

//   beforeEach(() => {
//     runner = TestBed.get(EffectsRunner);
//     homeEffects = TestBed.get(HomeEffects);
//     postsService = TestBed.get(ArticleService);
//   });

//   describe('get$', () => {

//     it('should return a GET_POSTS_SUCCESS action, on success', () => {
//       const postsToReturn = [{ id: 1 }];

//       postsService.get.and.returnValue(Observable.of(postsToReturn));


//       homeEffects.get$.subscribe(result => {
//         // expect(result).toEqual(expectedResult);
//       });

//     });


//     // it('should return a GET_POSTS_FAIL action, on error, after the de-bounce', fakeAsync(function () {
//     //   const expectedResult = new Article('error');
//     //   let resultFromEffect = null;

//     //   postsService.get.and.returnValue(Observable.throw('error'));
//     //   runner.queue(getPosts());

//     //   postsEffects.posts$.subscribe(result => result = resultFromEffect);
//     //   tick(399);
//     //   expect(result).toEqual(null);
//     //   tick(400);
//     //   expect(result).toEqual(expectedResult);

//     // }));

//   });

// });
