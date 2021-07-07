import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { URL } from './../../shared/constants';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Output } from '@angular/core';

@Injectable()
export class DashboardService {
  public postArray: Array<any> = [];
  public currentUserId = this.authService.user?.userId;
  public currentUserName!: string;
  @Output() eventEmitter = new EventEmitter<{ event: string }>();
  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {
  }

  public updatePassword (passwordObj: object) {
    return this.http.patch<any>(
      URL.changePassword,
      passwordObj
    ).pipe(catchError(this.handleError));
  }

  public addNewPost (url: string, caption: string) {
    return this.http.post<any>(
      URL.addNewPost,
      {
        url, caption
      }
    ).pipe(map((res) => {
      res = res.data.newPost;
      this.addNewPostToArray(res);
      return res;
    }),
      catchError(this.handleError));
  }

  public getAllPost () {
    return this.http.get<any>(
      URL.getAllPost
    ).pipe(map((res) => {
      res = res.data.allPost;
      console.log(res);
      return this.addAllPostToArray(res);

    }),
      catchError(this.handleError));

  }

  private addNewPostToArray (res: any) {
    const post = {
      postId: res.id,
      caption: res.caption,
      url: res.url,
      timeInMs: this.GMTtoISTtimezone(res.createdAt),
      userId: res.userId,
      name: 'You',
      likesCount: 0,
      isLiked: false,
      isDeletable: true
    };
    this.postArray.unshift(post);
  }

  private addAllPostToArray (allPost: Array<any>) {
    this.postArray = [];
    allPost.map(post => {

      const isLikedbyCurrentUser = post.Likes.some(
        (likeObj: { userId: string, postId: string }) => {
          return likeObj.userId === this.currentUserId;
        });

      const obj = {
        postId: post.id,
        caption: post.caption,
        url: post.url,
        timeInMs: this.GMTtoISTtimezone(post.createdAt),
        userId: post.userId,
        name: post.userId == this.currentUserId ? 'You' : post.About.name,
        likesCount: post.Likes.length,
        isLiked: isLikedbyCurrentUser,
        isDeletable: post.userId == this.currentUserId
      };
      this.postArray.push(obj);
    });
    return this.postArray;
  }

  public getPhotosArray(){
    const filteredPhotosArray = this.postArray.filter(
      post => post.userId == this.currentUserId
    );
    const mappedPhotosArray = filteredPhotosArray.map(
      post=> post.url
    )
    return mappedPhotosArray;
  }

  public likePost (PostId: string, index: number) {
    return this.http.post<any>(
      URL.likePost,
      { PostId: PostId }
    ).pipe(map((res) => {
      let postObj = this.postArray[index];
      postObj.likesCount = postObj.likesCount + 1;
      postObj.isLiked = true;
      this.postArray.splice(index, 1, postObj);
      return this.postArray;
    }),
      catchError(this.handleError));
  }

  public unlikePost (PostId: string, index: number) {
    return this.http.post<any>(
      URL.unlikePost,
      {
        PostId: PostId
      }
    ).pipe(map((res) => {
      let postObj = this.postArray[index];
      postObj.likesCount = postObj.likesCount - 1;
      postObj.isLiked = false;
      this.postArray.splice(index, 1, postObj);
      return this.postArray;
    }),
      catchError(this.handleError));
  }

  public GMTtoISTtimezone (time: string) {
    const date = new Date(time).getTime();
    return date;
  }

  public getFollowingsCount () {
    return this.http.get<any>(
      URL.getFollowingsCount,
    ).pipe(map((res) => {
      return res.data.count;
    }),
      catchError(this.handleError));
  }

  public getFollowersCount () {
    return this.http.get<any>(
      URL.getFollowersCount,
    ).pipe(map((res) => {
      return res.data.count;
    }),
      catchError(this.handleError));
  }

  public getFollowingUsers(){
    return this.http.get<any>(
      URL.followingsUsers,
    ).pipe(map((res) => {
      return res.data.allFollowings;
    }),
      catchError(this.handleError));

  }
  public getNotFollowingUsers(){
    return this.http.get<any>(
      URL.notFollowingsUsers,
    ).pipe(map((res) => {
      return res.data.notFollowings;
    }),
      catchError(this.handleError));
  }

  public followUser(followingId:string){
    return this.http.post<any>(
      URL.followUser,
      { followingId }
    ).pipe(
      catchError(this.handleError));

  }

  public unFollowUser(followingId:string){
    return this.http.post<any>(
      URL.unFollowUser,
      { followingId }
    ).pipe(
      catchError(this.handleError));

  }

  public getUserDetails(){
    return this.http.get<any>(
      URL.getUserDetails
    ).pipe(map((res) => {
      this.currentUserName = res.data.about.name;
      return res.data.about;
    }),
      catchError(this.handleError));

  }

  public updateUserDetails(DataObj:any){
    return this.http.patch<any>(
      URL.updateUser,
      DataObj
    ).pipe(map((res) => {
      this.currentUserName = DataObj.name;
      return res.data.updatedAbout;
    }),
      catchError(this.handleError));
  }

  private handleError (errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.message) {
      console.log(errorRes);
      return throwError(errorMsg);
    }
    return throwError(errorRes);

  }
}


