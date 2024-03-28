class KeyGenerator {
    constructor({ assertPresent, crypto }) {
        assertPresent({
            crypto,
        });
        this.crypto = crypto;
        this.length = 24;
    }
    generate() {
        return this.crypto.randomBytes(this.length).toString('hex');
    }
}
module.exports = KeyGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9rZXktZ2VuZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sWUFBWTtJQUNoQixZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRTtRQUNuQyxhQUFhLENBQUM7WUFDWixNQUFNO1NBQ1AsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMifQ==