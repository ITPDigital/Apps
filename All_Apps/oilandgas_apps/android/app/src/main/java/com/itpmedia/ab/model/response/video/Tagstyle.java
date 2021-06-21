
package com.itpmedia.ab.model.response.video;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Tagstyle {

    @SerializedName("p")
    @Expose
    private VideoDimensions videoDimensions;
    @SerializedName("a")
    @Expose
    private Color color;

    public VideoDimensions getP() {
        return videoDimensions;
    }

    public void setP(VideoDimensions videoDimensions) {
        this.videoDimensions = videoDimensions;
    }

    public Color getA() {
        return color;
    }

    public void setA(Color color) {
        this.color = color;
    }

}
