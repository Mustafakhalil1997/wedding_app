class Invitee {
  constructor(id, name, isPriority, checkIn, image, table) {
    this.id = id;
    this.name = name;
    this.isPriority = isPriority;
    this.checkIn = checkIn;
    this.image = image;
    this.table = table;
  }

  setCheckin() {
    this.checkIn = !this.checkIn;
  }
}

export default Invitee;
