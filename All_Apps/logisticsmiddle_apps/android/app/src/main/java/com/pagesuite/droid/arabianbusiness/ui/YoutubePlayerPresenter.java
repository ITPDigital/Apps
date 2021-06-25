package com.pagesuite.droid.arabianbusiness.ui;

;
import com.pagesuite.droid.arabianbusiness.model.request.CheckBookmarkRequest;
import com.pagesuite.droid.arabianbusiness.model.request.SaveBookmarkRequest;
import com.pagesuite.droid.arabianbusiness.model.response.video.VideoList;
import com.pagesuite.droid.arabianbusiness.model.response.video.VideoRelationUnd;
import com.pagesuite.droid.arabianbusiness.network.ApiService;
import com.pagesuite.droid.arabianbusiness.network.RetrofitClientInstance;

import java.util.ArrayList;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class YoutubePlayerPresenter implements YoutubePlayerContract.Presenter {

    private final YoutubePlayerContract.View mView;

    public YoutubePlayerPresenter(YoutubePlayerContract.View view) {
        mView = view;
    }

    @Override
    public void getVideoList(String nid, String site,String deeplinkUrl) {
        ApiService service = RetrofitClientInstance.getRetrofitInstance().create(ApiService.class);
        if (nid != null && !nid.isEmpty() && site != null && !site.isEmpty()) {
            Call<VideoList> call = service.getVideoList(nid + "~" + site);
            call.enqueue(new Callback<VideoList>() {
                @Override
                public void onResponse(Call<VideoList> call, Response<VideoList> response) {
                    mView.onVideoListFetchSuccess(response.body(),nid,deeplinkUrl);
                }

                @Override
                public void onFailure(Call<VideoList> call, Throwable t) {
                    mView.onVideoListFetchFailure();
                }
            });
        } else {
            mView.onVideoListFetchFailure();
        }
    }

    @Override
    public void checkBookmark(CheckBookmarkRequest checkBookmarkRequest, Map<String, String> bearerToken) {
        mView.showProgressIndicator(true);
        ApiService service = RetrofitClientInstance.getRetrofitInstance().create(ApiService.class);
        Call<ArrayList<String>> call = service.checkBookmark(checkBookmarkRequest, bearerToken);
        call.enqueue(new Callback<ArrayList<String>>() {
            @Override
            public void onResponse(Call<ArrayList<String>> call, Response<ArrayList<String>> response) {
                mView.showProgressIndicator(false);
                mView.onCheckBookmarkSuccess(response.body());
            }

            @Override
            public void onFailure(Call<ArrayList<String>> call, Throwable t) {
                mView.showProgressIndicator(false);
                mView.onCheckBookmarkFailure();
            }
        });
    }

    @Override
    public void saveBookmark(SaveBookmarkRequest saveBookmarkRequest, Map<String, String> bearerToken, final boolean isFromList, final VideoRelationUnd videoInfo) {
        mView.showProgressIndicator(true);
        ApiService service = RetrofitClientInstance.getRetrofitInstance().create(ApiService.class);
        Call<Map<String, String>> call = service.saveBookmark(saveBookmarkRequest, bearerToken);
        call.enqueue(new Callback<Map<String, String>>() {
            @Override
            public void onResponse(Call<Map<String, String>> call, Response<Map<String, String>> response) {
                mView.showProgressIndicator(false);
                mView.onSaveBookmarkSuccess(response.body(), isFromList, videoInfo);
            }

            @Override
            public void onFailure(Call<Map<String, String>> call, Throwable t) {
                mView.showProgressIndicator(false);
                mView.onSaveBookmarkFailure();
            }
        });


    }
}
