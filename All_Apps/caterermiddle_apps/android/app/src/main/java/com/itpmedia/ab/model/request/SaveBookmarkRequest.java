package com.itpmedia.ab.model.request;

public class SaveBookmarkRequest {
    private String user_id;
    private String node_id;
    private String site_key;
    private String flag;

    public SaveBookmarkRequest(String userId, String nodeId, String siteKey, String flag) {
        user_id = userId;
        node_id = nodeId;
        site_key = siteKey;
        this.flag = flag;
    }
}
