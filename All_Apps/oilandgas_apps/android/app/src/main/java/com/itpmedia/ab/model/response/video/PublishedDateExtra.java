
package com.itpmedia.ab.model.response.video;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PublishedDateExtra {

    @SerializedName("publishedDateExtraUnd")
    @Expose
    private List<PublishedDateExtraUnd> publishedDateExtraUnd = null;

    public List<PublishedDateExtraUnd> getPublishedDateExtraUnd() {
        return publishedDateExtraUnd;
    }

    public void setPublishedDateExtraUnd(List<PublishedDateExtraUnd> publishedDateExtraUnd) {
        this.publishedDateExtraUnd = publishedDateExtraUnd;
    }

}
