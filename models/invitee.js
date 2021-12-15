class Invitee {
  constructor(id, name, isPriority, checkIn) {
    this.id = id;
    this.name = name;
    this.isPriority = isPriority;
    this.checkIn = checkIn;
  }

  setCheckin() {
    this.checkIn = !this.checkIn;
  }
}

export default Invitee;
