package com.pagesuite.droid.arabianbusiness.ui;
/*
 * Copyright © 2018, Viacom18 Media Pvt. Ltd.
 *
 * Written under contract by Robosoft Technologies Pvt. Ltd.
 */


import com.pagesuite.droid.arabianbusiness.model.request.CheckBookmarkRequest;
import com.pagesuite.droid.arabianbusiness.model.request.SaveBookmarkRequest;
import com.pagesuite.droid.arabianbusiness.model.response.video.VideoList;
import com.pagesuite.droid.arabianbusiness.model.response.video.VideoRelationUnd;

import java.util.ArrayList;
import java.util.Map;

public interface YoutubePlayerContract {
    interface View {
        void onVideoListFetchSuccess(VideoList videoList, String nid, String deeplinkUrl);

        void onVideoListFetchFailure();

        void onCheckBookmarkSuccess(ArrayList<String> bookmarkList);

        void onCheckBookmarkFailure();

        void onSaveBookmarkSuccess(Map<String, String> status, boolean isFromList, VideoRelationUnd videoInfo);

        void onSaveBookmarkFailure();

        void showProgressIndicator(Boolean show);
    }

    interface Presenter {
        void getVideoList(String nid, String site,String deeplinkUrl);

        void checkBookmark(CheckBookmarkRequest checkBookmarkRequest, Map<String, String> bearerToken);

        void saveBookmark(SaveBookmarkRequest saveBookmarkRequest, Map<String, String> bearerToken, boolean isFromList, VideoRelationUnd videoInfo);
    }
}