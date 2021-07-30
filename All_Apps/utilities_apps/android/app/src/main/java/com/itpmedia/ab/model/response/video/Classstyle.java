
package com.itpmedia.ab.model.response.video;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Classstyle {

    @SerializedName("embed-imag")
    @Expose
    private EmbedImage embedImage;

    public EmbedImage getEmbedImage() {
        return embedImage;
    }

    public void setEmbedImage(EmbedImage embedImage) {
        this.embedImage = embedImage;
    }

}
