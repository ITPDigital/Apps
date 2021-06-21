
package com.pagesuite.droid.arabianbusiness.model.response.video;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class VideoRelationUnd {

    @SerializedName("nid")
    @Expose
    private Integer nid;
    @SerializedName("title")
    @Expose
    private String title;
    @SerializedName("site")
    @Expose
    private String site;
    @SerializedName("brand_logo")
    @Expose
    private String brandLogo;
    @SerializedName("content_type")
    @Expose
    private String contentType;
    @SerializedName("lead_text")
    @Expose
    private String leadText;
    @SerializedName("link")
    @Expose
    private String link;
    @SerializedName("pubDate")
    @Expose
    private Integer pubDate;
    @SerializedName("story_rel")
    @Expose
    private String storyRel;
    @SerializedName("gallery_rel")
    @Expose
    private String galleryRel;
    @SerializedName("video_rel")
    @Expose
    private String videoRel;
    @SerializedName("author")
    @Expose
    private String author;
    @SerializedName("video")
    @Expose
    private List<Video> video = null;
    @SerializedName("image")
    @Expose
    private String image;
    @SerializedName("image_crop_landscape")
    @Expose
    private String imageCropLandscape;
    @SerializedName("image_crop_square")
    @Expose
    private String imageCropSquare;
    @SerializedName("image_crop_portrait")
    @Expose
    private String imageCropPortrait;

    private Integer position;

    private Boolean isBookmarked;

    public Integer getNid() {
        return nid;
    }

    public void setNid(Integer nid) {
        this.nid = nid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getBrandLogo() {
        return brandLogo;
    }

    public void setBrandLogo(String brandLogo) {
        this.brandLogo = brandLogo;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getLeadText() {
        return leadText;
    }

    public void setLeadText(String leadText) {
        this.leadText = leadText;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Integer getPubDate() {
        return pubDate;
    }

    public void setPubDate(Integer pubDate) {
        this.pubDate = pubDate;
    }

    public String getStoryRel() {
        return storyRel;
    }

    public void setStoryRel(String storyRel) {
        this.storyRel = storyRel;
    }

    public String getGalleryRel() {
        return galleryRel;
    }

    public void setGalleryRel(String galleryRel) {
        this.galleryRel = galleryRel;
    }

    public String getVideoRel() {
        return videoRel;
    }

    public void setVideoRel(String videoRel) {
        this.videoRel = videoRel;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<Video> getVideo() {
        return video;
    }

    public void setVideo(List<Video> video) {
        this.video = video;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageCropLandscape() {
        return imageCropLandscape;
    }

    public void setImageCropLandscape(String imageCropLandscape) {
        this.imageCropLandscape = imageCropLandscape;
    }

    public String getImageCropSquare() {
        return imageCropSquare;
    }

    public void setImageCropSquare(String imageCropSquare) {
        this.imageCropSquare = imageCropSquare;
    }

    public String getImageCropPortrait() {
        return imageCropPortrait;
    }

    public void setImageCropPortrait(String imageCropPortrait) {
        this.imageCropPortrait = imageCropPortrait;
    }

    public void setBookmarked(Boolean bookmarked) {
        isBookmarked = bookmarked;
    }

    public Boolean getBookmarked() {
        return isBookmarked;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Integer getPosition() {
        return position;
    }
}
