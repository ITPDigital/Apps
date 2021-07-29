package com.pagesuite.droid.arabianbusiness.model.request;

public class CheckBookmarkRequest {
    private String user_id;
    private String art_id;

    public CheckBookmarkRequest(String userId, String articleId) {
        user_id = userId;
        art_id = articleId;
    }
}
