
package com.itpmedia.ab.model.response.video;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Video {

    @SerializedName("filemime")
    @Expose
    private String filemime;
    @SerializedName("filename")
    @Expose
    private String filename;
    @SerializedName("uri")
    @Expose
    private String uri;

    public String getFilemime() {
        return filemime;
    }

    public void setFilemime(String filemime) {
        this.filemime = filemime;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

}
