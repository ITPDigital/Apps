
package com.itpmedia.ab.model.response.video;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class VideoDimensions {

    @SerializedName("paddingTop")
    @Expose
    private Integer paddingTop;
    @SerializedName("lineHeight")
    @Expose
    private Integer lineHeight;

    public Integer getPaddingTop() {
        return paddingTop;
    }

    public void setPaddingTop(Integer paddingTop) {
        this.paddingTop = paddingTop;
    }

    public Integer getLineHeight() {
        return lineHeight;
    }

    public void setLineHeight(Integer lineHeight) {
        this.lineHeight = lineHeight;
    }

}
