import { HttpClient, HttpResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../administration/model/rating.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Router } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Club } from './model/club.model';
import { MyClubJoinRequest } from './model/my-club-join-request.model';
import { ClubJoinRequest } from './model/club-join-request.model copy';
import { ClubMember } from './model/club-member.model';
import { ClubInvitationUsername } from './model/club-invitation-username.model';
import { ClubInvitation } from './model/club-invitation.model';
import { ClubInvitationWithClubAndOwnerName } from './model/club-invitation-with-club-and-owner-name.model';
import { Review } from './model/review.model';
import { Problem } from './model/problem.model';
import { TourPreference } from './model/tour-preference.model';
import { Tour } from '../tour-authoring/model/tour.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getTourPreference(): Observable<TourPreference> {
    return this.http.get<TourPreference>(environment.apiHost + 'tourist/tour-preferences');
  }

  addPreference(tourPreference: TourPreference): Observable<TourPreference> {
    return this.http.post<TourPreference>(environment.apiHost + 'tourist/tour-preferences/create', tourPreference);
  }

  deletePreference(id: number): Observable<TourPreference> {
    return this.http.delete<TourPreference>(environment.apiHost + 'tourist/tour-preferences/' + id);
  }

  updatePreference(preference: TourPreference): Observable<TourPreference> {
    return this.http.put<TourPreference>(environment.apiHost + 'tourist/tour-preferences', preference);
  }

  addRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(environment.apiHost + 'rating/rating', rating);
  }

  deleteRating(id: number): Observable<Rating> {
    return this.http.delete<Rating>(environment.apiHost + 'rating/rating/' + id);
  }

  getRating(id: number): Observable<Rating> {
    return this.http.get<Rating>(environment.apiHost + 'rating/rating/' + id);
  }

  updateRating(rating: Rating): Observable<Rating> {
    return this.http.put<Rating>(environment.apiHost + 'rating/rating/' + rating.id, rating);
  }
  
  getReviews(tourId: number): Observable<PagedResults<Review>> {
    return this.http.get<PagedResults<Review>>(environment.apiHost + 'review/' + tourId);
  }
  reviewExists(touristId: number, tourId: number): Observable<boolean> {
    return this.http.get<boolean>(environment.apiHost + 'review/' + touristId + '/' + tourId);
  }
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(environment.apiHost + 'review', review);
  }
  updateReview(review: Review): Observable<Review> {
    return this.http.put<Review>(environment.apiHost + 'review/'+ review.id, review);
  }
  deleteReview(review: Review): Observable<Review> {
    return this.http.delete<Review>(environment.apiHost + 'review/'+ review.id);
  }
  getProblem(): Observable<PagedResults<Problem>> {
    return this.http.get<PagedResults<Problem>>(environment.apiHost + 'problem')
  }
  addProblem(problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(environment.apiHost +'problem', problem);
  } 
  updateProblem(problem: Problem): Observable<Problem> {
    return this.http.put<Problem>(environment.apiHost + 'problem/' + problem.id, problem);
  }
  deleteProblem(id: number): Observable<Problem> {
    return this.http.delete<Problem>(environment.apiHost + 'problem/' + id);
  }
  getProblemByUserId(id: number): Observable<PagedResults<Problem>> {
    return this.http.get<PagedResults<Problem>>(environment.apiHost + 'problem/' + id);
  }
  getClubs(): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'tourist/club')
  }
  getOwnerClubs(): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'tourist/club/ownerclubs')
  }
  addClub(club: Club): Observable<Club> {
    return this.http.post<Club>(environment.apiHost + 'tourist/club', club);
  }
  updateClub(club: Club): Observable<Club> {
    return this.http.put<Club>(environment.apiHost + 'tourist/club/', club);
  }
  deleteClub(id: number): any {
    return this.http.delete<any>(environment.apiHost + 'tourist/club/' + id);
  }
  getMyClubJoinRequests(): Observable<PagedResults<MyClubJoinRequest>> {
    const route = `${environment.apiHost}tourist/club-join-request/tourist?page=1&pageSize=1000`
    return this.http.get<PagedResults<MyClubJoinRequest>>(route)
  }
  cancelClubJoinRequest(id: number): Observable<HttpResponse<any>> {
    const route = `${environment.apiHost}tourist/club-join-request/${id}`
    return this.http.delete(route, { observe: 'response' })
  }
  respondClubJoinRequest(id: number, accepted: boolean): Observable<HttpResponse<any>> {
    const route = `${environment.apiHost}tourist/club-join-request/${id}`
    return this.http.patch(route, { Accepted: accepted }, { observe: 'response' })
  }
  getClubJoinRequestsByClub(id: number): Observable<PagedResults<ClubJoinRequest>> {
    const route = `${environment.apiHost}tourist/club-join-request/club/${id}?page=1&pageSize=1000`
    return this.http.get<PagedResults<ClubJoinRequest>>(route)
  }
  sendClubJoinRequest(touristId: number, clubId: number): Observable<HttpResponse<any>> {
    const route = `${environment.apiHost}tourist/club-join-request`
    const body = { TouristId: touristId, ClubId: clubId }
    return this.http.post<PagedResults<ClubJoinRequest>>(route, body, { observe: 'response' })
  }
  getClubMembers(clubId: number): Observable<PagedResults<ClubMember>> {
    return this.http.get<PagedResults<ClubMember>>(environment.apiHost + `tourist/club/members/${clubId}`)
  }
  kickMember(id: number): Observable<ClubMember> {
    const route = environment.apiHost + "tourist/club/members/kick/" + id;
    return this.http.delete<ClubMember>(route);
  }
  inviteMember(invitation: ClubInvitationUsername): Observable<HttpResponse<any>> {
    const route = environment.apiHost + "tourist/club/invite/byUsername";
    const body: ClubInvitationUsername = { username: invitation.username, clubId: invitation.clubId };
    return this.http.post<PagedResults<ClubInvitationUsername>>(route, body, { observe: 'response' });
  }
  getInvitations(): Observable<PagedResults<ClubInvitationWithClubAndOwnerName>> {
    const route = environment.apiHost + "tourist/club/invite/my-invitations";
    return this.http.get<PagedResults<ClubInvitationWithClubAndOwnerName>>(route);
  }
  acceptInvite(invitationId: number): Observable<any> {
    const route = environment.apiHost + "tourist/club/invite/accept/" + invitationId;
    return this.http.patch<any>(route, { observe: 'response' });
  }
  rejectInvite(invitationId: number): Observable<any> {
    const route = environment.apiHost + "tourist/club/invite/reject/" + invitationId;
    return this.http.patch<any>(route, { observe: 'response' });
  }
  findNearbyTours(longitude: number, latitude: number, distance: number): Observable<PagedResults<Tour>> {
    const route = `${environment.apiHost}tourist/tour?longitude=${longitude}&latitude=${latitude}&maxDistance=${distance}`;
    return this.http.get<PagedResults<Tour>>(route);
  }
  
}
