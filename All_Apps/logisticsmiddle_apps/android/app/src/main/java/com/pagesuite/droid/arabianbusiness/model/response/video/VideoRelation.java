
package com.pagesuite.droid.arabianbusiness.model.response.video;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class VideoRelation {

    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("count")
    @Expose
    private Integer count;
    @SerializedName("und")
    @Expose
    private List<VideoRelationUnd> und = null;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<VideoRelationUnd> getUnd() {
        return und;
    }

    public void setUnd(List<VideoRelationUnd> und) {
        this.und = und;
    }

}
