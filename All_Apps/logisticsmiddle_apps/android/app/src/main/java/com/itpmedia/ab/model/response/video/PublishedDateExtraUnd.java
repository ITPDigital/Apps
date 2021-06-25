
package com.itpmedia.ab.model.response.video;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PublishedDateExtraUnd {

    @SerializedName("value")
    @Expose
    private String value;
    @SerializedName("timezone")
    @Expose
    private String timezone;
    @SerializedName("timezone_db")
    @Expose
    private String timezoneDb;
    @SerializedName("date_type")
    @Expose
    private String dateType;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getTimezoneDb() {
        return timezoneDb;
    }

    public void setTimezoneDb(String timezoneDb) {
        this.timezoneDb = timezoneDb;
    }

    public String getDateType() {
        return dateType;
    }

    public void setDateType(String dateType) {
        this.dateType = dateType;
    }

}
