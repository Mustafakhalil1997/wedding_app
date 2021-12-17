class Invitee {
  constructor(id, name, isPriority, checkIn, image) {
    this.id = id;
    this.name = name;
    this.isPriority = isPriority;
    this.checkIn = checkIn;
    this.image = image;
  }

  setCheckin() {
    this.checkIn = !this.checkIn;
  }
}

export default Invitee;
