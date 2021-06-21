package com.pagesuite.droid.arabianbusiness.network;

import com.pagesuite.droid.arabianbusiness.model.request.CheckBookmarkRequest;
import com.pagesuite.droid.arabianbusiness.model.request.SaveBookmarkRequest;
import com.pagesuite.droid.arabianbusiness.model.response.video.VideoList;

import java.util.ArrayList;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.HeaderMap;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiService {
    @GET("/ws/article-details/{endpoint}")
    Call<VideoList> getVideoList(@Path("endpoint") String endPoint);

    @POST("/ws/check-bookmark")
    Call<ArrayList<String>> checkBookmark(@Body CheckBookmarkRequest checkBookmarkRequest, @HeaderMap Map<String, String> bearerToken);

    @POST("/ws/save-bookmark")
    Call<Map<String, String>> saveBookmark(@Body SaveBookmarkRequest saveBookmarkRequest, @HeaderMap Map<String, String> bearerToken);

}
