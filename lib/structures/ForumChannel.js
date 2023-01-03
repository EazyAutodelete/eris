"use strict";

const GuildChannel = require("./GuildChannel");

/**
 * Represents a guild forum channel. See GuildChannel for more properties and methods.
 * @extends GuildChannel
 * @prop {Number} defaultAutoArchiveDuration The default duration of newly created threads in minutes to automatically archive the thread after inactivity (60, 1440, 4320, 10080)
 * @prop {String} lastMessageID The ID of the last message in this channel
 * @prop {Number} lastPinTimestamp The timestamp of the last pinned message
 * @prop {Number} rateLimitPerUser The ratelimit of the channel, in seconds. 0 means no ratelimit is enabled
 * @prop {String?} topic The topic of the channel
 */
class ForumChannel extends GuildChannel {
  constructor(data, client) {
    super(data, client);
    this.lastMessageID = data.last_message_id || null;
    this.rateLimitPerUser = data.rate_limit_per_user == null ? null : data.rate_limit_per_user;
    this.lastPinTimestamp = data.last_pin_timestamp ? Date.parse(data.last_pin_timestamp) : null;
    this.update(data);
  }

  update(data) {
    super.update(data);
    if (data.rate_limit_per_user !== undefined) {
      this.rateLimitPerUser = data.rate_limit_per_user;
    }
    if (data.topic !== undefined) {
      this.topic = data.topic;
    }
    if (data.default_auto_archive_duration !== undefined) {
      this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
    }
  }
}

module.exports = ForumChannel;
